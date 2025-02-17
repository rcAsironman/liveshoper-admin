import React, { useEffect, useState } from 'react';
import "../css/addProduct.css";
import NavBar from "../components/NavBar";
import AWS from 'aws-sdk';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(categoryId, selectedCategory, theme) {
  return {
    fontWeight:
      selectedCategory.indexOf(categoryId) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddProduct({onProductAdded }) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const S3_BUCKET = 'liveshoper-photos-bucket';
  const REGION = 'ap-south-1';

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State to store the file preview URL
  const [productData, setProductData] = useState({
    productId: -999,
    productName: "",
    productDescription: "",
    price: -999,
    tags: "",
    productImageKey: "",
    subCategoryId: -999,
    categoryIds: [0],
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file)); // Generate and set the preview URL
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(value);
  };

  const handleSubcategoryChange = (event) => {
    const { value } = event.target;
    setSelectedSubcategory(value);
  };

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catResponse = await axios.get('http://65.2.73.20:8080/liveshoper/api/v1/category/find-all-categories?page=0&size=50');
        const categoryObjects = catResponse.data.data.content;
        setCategories(categoryObjects);

        const subcatResponse = await axios.get('http://65.2.73.20:8080/liveshoper/api/v1/sub-category/find-all-sub-categories?page=0&size=50');
        const subcategoryObjects = subcatResponse.data.data.content;
        setSubcategories(subcategoryObjects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) {
          console.log(err);
        } else {
          setProductData((previousData) => ({
            ...previousData,
            productImageKey: params.Key,
          }));
          const data = {
            productName: productData.productName,
            productDescription: productData.productDescription,
            price: productData.price,
            tags: "snacks",
            productImageKey: params.Key,
            subCategoryId: selectedSubcategory,
            categoryIds: selectedCategory,
          };
          axios.post(`http://65.2.73.20:8080/liveshoper/api/v1/product/save-or-update`,data)
                .then((response)=>{
                  // alert(response.status)
                  onProductAdded()
                })
                .catch((error)=>{
                  console.log(error)
                  alert(error)
                })
        }
      });
  };

  return (
    <div className='add-product'>
        <div className='add-product-form'>
        <div className='image-upload-div'>
            <div className="file-input-container">
              {!filePreview && (
                <label htmlFor="file-input">
                  <CloudUploadIcon fontSize="large" />
                  <input id="file-input" type='file' onChange={handleFileInput} style={{ display: 'none' }} />
                </label>
              )}
            </div>
            {filePreview && (
              <div className='image-preview'>
                <img src={filePreview} alt="Preview" width="100%" />
                {progress > 0 && progress < 100 && (
                  <p className='upload-progress'>File Uploaded {progress}%</p>
                )}
              </div>
            )}
          </div>
          <form className='add-products-form'>
            <div className="add-product-input">
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-category-label">Categories</InputLabel>
                <Select
                  labelId="demo-multiple-category-label"
                  id="demo-multiple-category"
                  multiple
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput label="Categories" />}
                  MenuProps={MenuProps}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.categoryId}
                      value={category.categoryId}
                      style={getStyles(category.categoryId, selectedCategory, theme)}
                    >
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="add-product-input">
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-single-subcategory-label">Subcategory</InputLabel>
                <Select
                  labelId="demo-single-subcategory-label"
                  id="demo-single-subcategory"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  input={<OutlinedInput label="Subcategory" />}
                >
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory.subCategoryId} value={subcategory.subCategoryId}>
                      {subcategory.subCategoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="add-product-input">
              <FormControl>
                <TextField
                  type='text'
                  label='Product Name'
                  onChange={(e) => {
                    const productName = e.target.value;
                    setProductData((previousData) => ({
                      ...previousData,
                      productName: productName,
                    }));
                  }}
                />
              </FormControl>
            </div>
            <div className="add-product-input">
              <FormControl>
                <TextField
                  type='text'
                  label='Actual Price'
                  onChange={(e) => {
                    const price = parseFloat(e.target.value);
                    setProductData((previousData) => ({
                      ...previousData,
                      price: price,
                    }));
                  }}
                />
              </FormControl>
            </div>
            <div className="add-product-input">
              <FormControl>
                <TextField
                  label='Enter Description Here'
                  onChange={(e) => {
                    const productDescription = e.target.value;
                    setProductData((previousData) => ({
                      ...previousData,
                      productDescription: productDescription,
                    }));
                  }}
                />
              </FormControl>
            </div>
          </form>
        </div>
        <Button onClick={() => selectedFile && uploadFile(selectedFile)} variant="contained">Submit</Button>
    </div>
  );
}

export default AddProduct;
