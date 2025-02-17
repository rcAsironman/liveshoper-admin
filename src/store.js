import { configureStore } from '@reduxjs/toolkit'
import selectedUserNotificationSlice from './redux/push-notification/selectedUserNotificationSlice'

export default configureStore({
  reducer: {
    userNotification: selectedUserNotificationSlice,
  },
})