const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0, unreadOnly = false } = req.query;
    
    let query = { userId };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    const notifications = await Notification.find(query)
      .populate('meditationId', 'title meditationType')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));
    
    const unreadCount = await Notification.countDocuments({ userId, isRead: false });
    
    res.json({
      success: true,
      notifications,
      unreadCount,
      total: notifications.length
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notifications'
    });
  }
});

// Mark notification as read
router.patch('/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }
    
    // Get updated unread count
    const unreadCount = await Notification.countDocuments({ userId, isRead: false });
    
    res.json({
      success: true,
      notification,
      unreadCount
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark notification as read'
    });
  }
});

// Mark all notifications as read for a user
router.patch('/user/:userId/read-all', async (req, res) => {
  try {
    const { userId } = req.params;
    
    await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
    
    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark notifications as read'
    });
  }
});

// Delete a notification
router.delete('/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { userId } = req.body;
    
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      userId
    });
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }
    
    // Get updated unread count
    const unreadCount = await Notification.countDocuments({ userId, isRead: false });
    
    res.json({
      success: true,
      message: 'Notification deleted',
      unreadCount
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete notification'
    });
  }
});

module.exports = router;