import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import '../css/Products.css';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import AddProduct from './AddProduct';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loading.jsx'

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

const Products = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [noOfElements, setNoOfElements] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const catResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/category/find-all-categories?page=0&size=50`);
        const categoryObjects = catResponse.data.data.content;
        setCategories(categoryObjects);

        const subcatResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/sub-category/find-all-sub-categories?page=0&size=50`);
        const subcategoryObjects = subcatResponse.data.data.content;
        setSubcategories(subcategoryObjects);

        const responseData = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/find-all-products?page=${pageNumber}&size=${noOfElements}`);
        setData({ data: responseData.data.data.content });

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setSelectedCategory(currentProduct.categories.map(category => category.categoryId));
      setSelectedSubcategory(currentProduct.subCategoryId.subCategoryId);
    }
  }, [currentProduct]);

  const notifyEdit = () => toast.success("Product Edited Successfully");
  const notifyWhenReject = (error) => {
    toast.error(error);
  };

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const handleOpenEditDialog = (product) => {
    setCurrentProduct(product);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentProduct(null);
  };

  const handleOpenDeleteConfirmationDialog = (productId) => {
    setProductIdToDelete(productId);
    setOpenDeleteConfirmationDialog(true);
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setOpenDeleteConfirmationDialog(false);
    setProductIdToDelete(null);
  };

    
  const handleProductAdded = () => {
    toast.success("Product added successfully!");
    handleCloseAddProductDialog();
  };

  const handleCategoryChange = (product) => (event) => {
    const selectedCategoryIds = event.target.value;
    setSelectedCategory(selectedCategoryIds);
    const updatedProduct = {
      ...product,
      categories: categories.filter(category => selectedCategoryIds.includes(category.categoryId))
    };
    setCurrentProduct(updatedProduct);
  };

  const handleSubcategoryChange = (product) => (event) => {
    const { value } = event.target;
    setSelectedSubcategory(value);
    const selectedSubCategory = subcategories.find(subCategory => subCategory.subCategoryId === value);
    const updatedProduct = {
      ...currentProduct,
      subCategoryId: {
        ...currentProduct.subCategoryId,
        subCategoryId: value,
        subCategoryName: selectedSubCategory ? selectedSubCategory.subCategoryName : '',
      },
    };
    setCurrentProduct(updatedProduct);
  };

  const handleSaveChanges = () => {
    setOpenEditDialog(false);
    console.log(currentProduct);
    try {
      axios.post(`${process.env.REACT_APP_BASE_URL}/product/save-or-update`, {
        categoryIds: currentProduct.categories.map(obj => obj.categoryId),
        price: currentProduct.price,
        productDescription: currentProduct.productDescription,
        productId: currentProduct.productId,
        productImageKey: currentProduct.productImageKey,
        productName: currentProduct.productName,
        subCategoryId: currentProduct.subCategoryId.subCategoryId,
        tags: currentProduct.tags
      })
      .then((response) => {
        console.log(response);
        notifyEdit();
      });
    } catch (error) {
      notifyWhenReject(error);
      console.log(error);
    }
  };

  const confirmDeleteProduct = () => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/product/delete-product?productId=${productIdToDelete}`)
    .then((response) => {
      console.log(response);
      setData(prevData => ({
        ...prevData,
        data: prevData.data.filter(product => product.productId !== productIdToDelete),
      }));
      toast.success("Product deleted successfully!");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to delete product.");
    });
    handleCloseDeleteConfirmationDialog();
  };

  const handleViewMore = async () => {

    setPageNumber((prevPageNumber) => prevPageNumber + 1);

    const updatedPageNumber = pageNumber + 1;

    try {
      setLoading(true)
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/find-all-products?page=${updatedPageNumber}&size=${noOfElements}`);
      const newData = response.data.data.content;
      setData((prevData) => ({
        ...prevData,
        data: [...prevData.data, ...newData],
      }));
      if (response.data.data.content.length < noOfElements) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className='Product'>
      <div style={{ position: 'fixed' }}>
        <NavBar />
      </div>
      <div className="product-page">
        <div className="products-list">
          {data && data.data && data.data.map(product => (
            <div key={product.productId} className="product-container">
              <div className="product-icons">
                <EditIcon onClick={() => handleOpenEditDialog(product)} style={{ cursor: 'pointer' }} />
                <DeleteIcon onClick={() => handleOpenDeleteConfirmationDialog(product.productId)} style={{ cursor: 'pointer', color: 'red' }} />
              </div>
              <div className="product-image">
                <img src={`https://liveshoper-photos-bucket.s3.ap-south-1.amazonaws.com/${product.productImageKey}`} alt={product.productImageKey} />
              </div>
              <div className="product-detail-con">
                <div className="product-details">
                  <h2 className='product-name'>{product.productName.length > 20 
                    ? `${product.productName.substring(0, 20)}...` 
                    : product.productName}
                  </h2>
                  <p>Sub-Category : {product.subCategoryId.subCategoryName}</p>
                  <br />
                  <p style={{ fontSize: '0.7rem' }}>Category : {product.categories.map(obj => obj.categoryName).join(', ')}</p>
                </div>
                <div className="product-price">
                  <p>Price : ₹{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more">
        {hasMore && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={handleViewMore}>View More</Button>
          )}
        </>
      )}
        </div>
        <div className="add-product-icon" style={{ position: 'fixed', bottom: '50px', right: '50px' }}>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="add" onClick={handleOpenAddProductDialog} sx={{background:'black'}}>
            <AddIcon sx={{background:''}}/>
            </Fab>
        </Box>
        </div>
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            {currentProduct && (
              <>
                <TextField
                  label="Product Name"
                  value={currentProduct.productName}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Product Description"
                  value={currentProduct.productDescription}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, productDescription: e.target.value })}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  type="number"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  fullWidth
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                <InputLabel id="demo-multiple-category-label">Categories</InputLabel>
                  <Select
                    labelId="demo-multiple-category-label"
                    id="demo-multiple-category"
                    multiple
                    value={selectedCategory}
                    onChange={handleCategoryChange(currentProduct)}
                    input={<OutlinedInput label="Categories" />}
                    MenuProps={MenuProps}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.categoryId} value={category.categoryId} style={getStyles(category.categoryId, selectedCategory, theme)}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                <InputLabel id="demo-single-sub-category-label">Sub Category</InputLabel>
                  <Select
                    value={selectedSubcategory}
                    onChange={handleSubcategoryChange(currentProduct)}
                    input={<OutlinedInput label="Sub Category"/>}
                    MenuProps={MenuProps}
                  >
                    {subcategories.map((subCategory) => (
                      <MenuItem key={subCategory.subCategoryId} value={subCategory.subCategoryId}>
                        {subCategory.subCategoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleSaveChanges} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openDeleteConfirmationDialog} onClose={handleCloseDeleteConfirmationDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this product?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteConfirmationDialog}>Cancel</Button>
            <Button onClick={confirmDeleteProduct} color="primary">Delete</Button>
          </DialogActions>
        </Dialog>
        <Dialog
        className='products-add-product'
        open={openAddProductDialog}
        onClose={handleCloseAddProductDialog}
        sx={{ '& .MuiDialog-paper': { minWidth: '800px' } }}
      >
        <DialogTitle style={{ textAlign: 'center' }}>Add Product</DialogTitle>
        <DialogContent className='add-pro'>
          <AddProduct onProductAdded={handleProductAdded} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddProductDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Products;
