import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import axios from 'axios';
import { getFullUrl, getAssetUrl, API_ENDPOINTS } from '../config/api';
import PageHeader from './PageHeader';

const Journal = ({ user, userCredits, onCreditsUpdate, onProfileClick, unreadCount, onInboxClick, onCreateClick }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [playingEntryId, setPlayingEntryId] = useState(null);
  const [generatingAudio, setGeneratingAudio] = useState(null);
  const [filterMood, setFilterMood] = useState('all');
  const [searchTags, setSearchTags] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcribing, setTranscribing] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const [recordingState, setRecordingState] = useState('idle'); // 'idle', 'recording', 'processing'
  const [todaysEntry, setTodaysEntry] = useState(null);
  const [hasTodaysEntry, setHasTodaysEntry] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDateEntry, setSelectedDateEntry] = useState(null);
  
  // Voice cloning states
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecorder, setVoiceRecorder] = useState(null);
  const [voiceRecordingTime, setVoiceRecordingTime] = useState(0);
  const [voiceRecordingState, setVoiceRecordingState] = useState('idle'); // 'idle', 'recording', 'processing', 'preview'
  const [recordedVoiceBlob, setRecordedVoiceBlob] = useState(null);
  const [userCustomVoices, setUserCustomVoices] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('default');
  const [uploadingVoice, setUploadingVoice] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [expandedMoodId, setExpandedMoodId] = useState(null);
  const { t } = useTranslation();

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '', // Empty string, not null
    tags: [], // Empty array, not null
    date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
  });

  const moods = [
    { value: 'happy', emoji: '🌞', label: t('happy', 'Blij'), color: '#FFD700', bg: 'linear-gradient(135deg, #FFD700, #FFA500)' },
    { value: 'calm', emoji: '🌊', label: t('calm', 'Rustig'), color: '#87CEEB', bg: 'linear-gradient(135deg, #87CEEB, #4682B4)' },
    { value: 'peaceful', emoji: '🕊️', label: t('peaceful', 'Vreedzaam'), color: '#98FB98', bg: 'linear-gradient(135deg, #98FB98, #32CD32)' },
    { value: 'grateful', emoji: '🙏', label: t('grateful', 'Dankbaar'), color: '#DDA0DD', bg: 'linear-gradient(135deg, #DDA0DD, #9370DB)' },
    { value: 'reflective', emoji: '🌙', label: t('reflective', 'Reflectief'), color: '#C0C0C0', bg: 'linear-gradient(135deg, #C0C0C0, #708090)' },
    { value: 'energetic', emoji: '⚡', label: t('energetic', 'Energiek'), color: '#FF6347', bg: 'linear-gradient(135deg, #FF6347, #DC143C)' },
    { value: 'stressed', emoji: '🌋', label: t('stressed', 'Gestrest'), color: '#FF4500', bg: 'linear-gradient(135deg, #FF4500, #B22222)' },
    { value: 'anxious', emoji: '🌪️', label: t('anxious', 'Bezorgd'), color: '#708090', bg: 'linear-gradient(135deg, #708090, #2F4F4F)' }
  ];

  useEffect(() => {
    if (user) {
      fetchEntries();
      fetchTodaysEntry();
      fetchUserVoices();
    }
  }, [user, filterMood, searchTags]);

  // Check audio recording support on component mount
  useEffect(() => {
    const checkAudioSupport = () => {
      const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      const hasMediaRecorder = !!window.MediaRecorder;
      setAudioSupported(hasGetUserMedia && hasMediaRecorder);
    };
    checkAudioSupport();
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Stop any ongoing recording and cleanup
      if (mediaRecorder) {
        if (mediaRecorder.timer) {
          clearInterval(mediaRecorder.timer);
        }
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }
    };
  }, [mediaRecorder]);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filterMood !== 'all') params.append('mood', filterMood);
      if (searchTags) params.append('tags', searchTags);
      
      const response = await axios.get(getFullUrl(`/api/journal/user/${user.id}?${params}`));
      setEntries(response.data.entries);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      setError(t('failedToLoadEntries', 'Failed to load journal entries'));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodaysEntry = async () => {
    try {
      const response = await axios.get(getFullUrl(`/api/journal/user/${user.id}/today`));
      setTodaysEntry(response.data.entry);
      setHasTodaysEntry(response.data.hasEntry);
    } catch (error) {
      console.error('Error fetching today\'s journal entry:', error);
      // Don't show error for this, just treat as no entry exists
      setTodaysEntry(null);
      setHasTodaysEntry(false);
    }
  };

  const fetchEntryForDate = async (date) => {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const response = await axios.get(getFullUrl(`/api/journal/user/${user.id}?startDate=${startOfDay.toISOString()}&endDate=${endOfDay.toISOString()}`));
      
      if (response.data.entries && response.data.entries.length > 0) {
        setSelectedDateEntry(response.data.entries[0]);
        return response.data.entries[0];
      } else {
        setSelectedDateEntry(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching entry for date:', error);
      setSelectedDateEntry(null);
      return null;
    }
  };

  const resetForm = () => {
    console.log('Resetting form...');
    
    // Stop any ongoing recording
    if (mediaRecorder && recordingState === 'recording') {
      console.log('Stopping recording due to form reset');
      stopRecording();
    }
    
    setFormData({
      title: '',
      content: '',
      mood: '', // Empty string, not null
      tags: [], // Empty array, not null
      date: new Date().toISOString().split('T')[0]
    });
    setShowCreateForm(false);
    setShowDatePicker(false);
    setEditingEntry(null);
    setSelectedDate('');
    setSelectedDateEntry(null);
    
    // Reset recording state after a small delay to allow stop to complete
    setTimeout(() => {
      setRecordingState('idle');
    }, 100);
  };

  const handleDateSelection = async (date) => {
    setSelectedDate(date);
    const entry = await fetchEntryForDate(date);
    
    if (entry) {
      // Edit existing entry for this date
      setFormData({
        title: entry.title,
        content: entry.content,
        mood: entry.mood || '',
        tags: entry.tags || [],
        date: new Date(entry.date).toISOString().split('T')[0]
      });
      setEditingEntry(entry);
    } else {
      // Create new entry for this date
      setFormData({
        title: '',
        content: '',
        mood: '',
        tags: [],
        date: date
      });
      setEditingEntry(null);
    }
    
    setShowDatePicker(false);
    setShowCreateForm(true);
  };

  const fetchUserVoices = async () => {
    try {
      console.log('Fetching user voices for user:', user.id);
      const response = await axios.get(getFullUrl(`/api/journal/voice-clone/list/${user.id}`));
      console.log('Voice list response:', response.data);
      if (response.data.success) {
        const voices = response.data.voices || [];
        console.log('Setting user custom voices:', voices);
        setUserCustomVoices(voices);
      }
    } catch (error) {
      console.error('Error fetching user voices:', error);
      // Don't show error for this, just treat as no custom voices
      setUserCustomVoices([]);
    }
  };

  const startVoiceRecording = async () => {
    try {
      console.log('Starting voice recording...');
      
      if (voiceRecordingState !== 'idle') {
        console.log('Voice recording already in progress, state:', voiceRecordingState);
        return;
      }

      setError('');
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }

      if (!window.MediaRecorder) {
        throw new Error('MediaRecorder not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        }
      });

      if (!stream.getAudioTracks().length) {
        throw new Error('No audio tracks available');
      }

      // Use MP3 format for better ElevenLabs compatibility
      let mimeType = 'audio/mp4';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm;codecs=opus';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/webm';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = ''; // Let browser decide
          }
        }
      }

      const options = mimeType ? { mimeType } : {};
      const recorder = new MediaRecorder(stream, options);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        console.log('Voice MediaRecorder stopped, processing audio...');
        
        if (recorder.timer) {
          clearInterval(recorder.timer);
          recorder.timer = null;
        }
        
        setVoiceRecordingState('processing');
        setVoiceRecorder(null);
        setVoiceRecordingTime(0);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: recorder.mimeType || 'audio/mp4' });
          setRecordedVoiceBlob(audioBlob);
          setVoiceRecordingState('preview');
        } else {
          console.warn('No voice audio chunks recorded');
          setVoiceRecordingState('idle');
        }
      };

      // Start recording
      recorder.start(1000);
      setVoiceRecorder(recorder);
      setVoiceRecordingState('recording');
      setVoiceRecordingTime(0);

      // Start timer - target 60-120 seconds for good voice cloning
      const timer = setInterval(() => {
        setVoiceRecordingTime(prev => {
          if (prev >= 180) { // Max 3 minutes (ElevenLabs limit)
            console.log('Auto-stopping voice recording after 3 minutes');
            if (recorder && recorder.state !== 'inactive') {
              recorder.stop();
            }
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      recorder.timer = timer;
      
      console.log('Voice recording started successfully');

    } catch (error) {
      console.error('Error starting voice recording:', error);
      setVoiceRecordingState('idle');
      
      let errorMessage = t('microphoneAccessDenied', 'Microphone access denied. Please allow microphone access.');
      
      if (error.name === 'NotFoundError') {
        errorMessage = t('microphoneNotFound', 'Geen microfoon gevonden. Controleer of je apparaat een microfoon heeft.');
      } else if (error.name === 'NotAllowedError') {
        errorMessage = t('microphoneAccessDenied', 'Microfoon toegang geweigerd. Sta microfoon toegang toe in je browser.');
      } else if (error.name === 'NotSupportedError' || error.message.includes('not supported')) {
        errorMessage = t('audioRecordingNotSupported', 'Audio opname wordt niet ondersteund door je browser. Probeer Chrome of Safari.');
      } else if (error.name === 'NotReadableError') {
        errorMessage = t('microphoneInUse', 'Microfoon wordt gebruikt door een andere app. Sluit andere apps die de microfoon gebruiken.');
      }
      
      setError(errorMessage);
    }
  };

  const stopVoiceRecording = () => {
    console.log('Stopping voice recording manually...');
    if (voiceRecorder && voiceRecordingState === 'recording') {
      if (voiceRecorder.timer) {
        clearInterval(voiceRecorder.timer);
        voiceRecorder.timer = null;
      }
      
      if (voiceRecorder.state !== 'inactive') {
        voiceRecorder.stop();
      }
      
      console.log('Voice recording stop requested');
    }
  };

  const playVoicePreview = () => {
    if (recordedVoiceBlob) {
      const audioUrl = URL.createObjectURL(recordedVoiceBlob);
      const audio = new Audio(audioUrl);
      audio.play().catch(err => {
        console.error('Error playing voice preview:', err);
      });
    }
  };

  const cancelVoiceRecording = () => {
    setVoiceRecordingState('idle');
    setRecordedVoiceBlob(null);
    setVoiceRecordingTime(0);
    setShowVoiceRecorder(false);
  };

  const saveCustomVoice = async (voiceName) => {
    if (!recordedVoiceBlob || !voiceName.trim()) {
      setError(t('voiceNameAndRecordingRequired', 'Voice name and recording are required'));
      return;
    }

    try {
      setUploadingVoice(true);
      setError('');

      const formData = new FormData();
      formData.append('audio', recordedVoiceBlob, 'voice_sample.mp3');
      formData.append('voiceName', voiceName.trim());
      formData.append('userId', user.id);

      const response = await axios.post(getFullUrl('/api/journal/voice-clone/upload'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout for voice cloning
      });

      if (response.data.success) {
        console.log('Voice successfully saved, refreshing voices list...');
        
        // Small delay to ensure database is updated
        setTimeout(async () => {
          await fetchUserVoices(); // Refresh voices list
          console.log('Setting selected voice to:', response.data.voiceId);
          setSelectedVoiceId(response.data.voiceId); // Auto-select new voice
        }, 500);
        
        setRecordedVoiceBlob(null);
        setVoiceRecordingState('idle');
        setShowVoiceRecorder(false);
        
        if (onCreditsUpdate) {
          onCreditsUpdate(); // Update credits display
        }
        
        // Success message
        alert(t('voiceCloneSuccess', 'Voice successfully cloned! You can now use it to generate audio.'));
      }
    } catch (error) {
      console.error('Error saving custom voice:', error);
      const errorMessage = error.response?.data?.error || t('failedToSaveVoice', 'Failed to save custom voice');
      setError(errorMessage);
    } finally {
      setUploadingVoice(false);
    }
  };

  const deleteCustomVoice = async (voiceId) => {
    if (!window.confirm(t('confirmDeleteVoice', 'Are you sure you want to delete this custom voice?'))) {
      return;
    }

    try {
      await axios.delete(getFullUrl(`/api/journal/voice-clone/${voiceId}?userId=${user.id}`));
      await fetchUserVoices(); // Refresh voices list
      
      // If deleted voice was selected, switch back to default
      if (selectedVoiceId === voiceId) {
        setSelectedVoiceId('default');
      }
    } catch (error) {
      console.error('Error deleting custom voice:', error);
      setError(t('failedToDeleteVoice', 'Failed to delete custom voice'));
    }
  };

  const handleSaveEntry = async () => {
    if (!formData.content.trim()) {
      setError(t('contentRequired', 'Content is required'));
      return;
    }

    // Stop any ongoing recording before saving
    if (recordingState === 'recording') {
      console.log('Stopping recording before save');
      stopRecording();
      // Give it a moment to stop
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      setError('');
      const payload = {
        userId: user.id,
        title: formatDate(formData.date), // Use date as title
        content: formData.content.trim(),
        date: formData.date
      };

      // Only include mood if it has a value
      if (formData.mood && formData.mood.trim()) {
        payload.mood = formData.mood.trim();
      }

      // Only include tags if they exist
      if (formData.tags && formData.tags.length > 0) {
        payload.tags = formData.tags.filter(tag => tag.trim()).map(tag => tag.trim());
      }

      console.log('Saving journal entry:', {
        isEditing: !!editingEntry,
        entryId: editingEntry?._id,
        payload
      });

      let response;
      if (editingEntry && editingEntry._id) {
        // Use PUT for explicit editing
        response = await axios.put(getFullUrl(`/api/journal/${editingEntry._id}`), payload);
      } else {
        // Use POST for create/append (will handle one-per-day logic)
        response = await axios.post(getFullUrl('/api/journal/create'), payload);
      }

      console.log('Save response:', response.data);

      if (response.data.success) {
        await fetchEntries();
        await fetchTodaysEntry(); // Refresh today's entry
        resetForm();
        setError('');
      }
    } catch (error) {
      console.error('Error saving journal entry:', error);
      setError(t('failedToSaveEntry', 'Failed to save journal entry'));
    }
  };

  const handleEditEntry = (entry) => {
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood || '',
      tags: entry.tags || [],
      date: entry.date ? new Date(entry.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setEditingEntry(entry);
    setShowCreateForm(true);
  };

  const handleDeleteEntry = async (entryId) => {
    if (!window.confirm(t('confirmDeleteEntry', 'Are you sure you want to delete this journal entry?'))) {
      return;
    }

    try {
      await axios.delete(getFullUrl(`/api/journal/${entryId}?userId=${user.id}`));
      await fetchEntries();
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      setError(t('failedToDeleteEntry', 'Failed to delete journal entry'));
    }
  };

  const handleGenerateAudio = async (entry) => {
    console.log('Generate audio clicked for entry:', entry._id);
    console.log('User credits:', userCredits);
    console.log('Selected voice ID:', selectedVoiceId);
    
    if (userCredits && userCredits.credits < 1) {
      setError(t('insufficientCreditsAudio', 'Insufficient credits. You need 1 credit to generate audio.'));
      return;
    }

    try {
      setGeneratingAudio(entry._id);
      setError('');
      
      const requestData = {
        userId: user.id,
        voiceId: selectedVoiceId === 'default' ? 'EXAVITQu4vr4xnSDxMaL' : selectedVoiceId
      };
      
      console.log('Sending audio generation request:', requestData);
      
      const response = await axios.post(getFullUrl(`/api/journal/${entry._id}/generate-audio`), requestData);

      console.log('Audio generation response:', response.data);

      if (response.data.success) {
        console.log('Audio generation successful, refreshing entries...');
        await fetchEntries();
        if (onCreditsUpdate) {
          onCreditsUpdate();
        }
        // Show success message
        if (response.data.message) {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.error || t('failedToGenerateAudio', 'Failed to generate audio');
      setError(errorMessage);
    } finally {
      setGeneratingAudio(null);
    }
  };

  const handleShareEntry = async (entry) => {
    if (!entry.audioFile) {
      setError(t('needAudioToShare', 'You need to generate audio before sharing'));
      return;
    }

    try {
      const response = await axios.post(getFullUrl(`/api/journal/${entry._id}/share`), {
        userId: user.id
      });

      if (response.data.success) {
        await fetchEntries();
        alert(t('entrySharedSuccess', 'Journal entry shared successfully!'));
      }
    } catch (error) {
      console.error('Error sharing entry:', error);
      setError(t('failedToShareEntry', 'Failed to share journal entry'));
    }
  };

  const handlePlayAudio = (entry) => {
    if (!entry.audioFile) return;

    const audio = document.querySelector(`#journal-audio-${entry._id}`);
    if (audio) {
      if (audio.paused) {
        // Pause all other audios first
        document.querySelectorAll('audio').forEach(a => a.pause());
        audio.play()
          .then(() => {
            setPlayingEntryId(entry._id);
          })
          .catch(err => {
            console.error('Error playing audio:', err);
          });
      } else {
        audio.pause();
        setPlayingEntryId(null);
      }
    }
  };

  const formatDate = (dateString) => {
    // Get current language from i18n
    const currentLanguage = i18n.language || 'nl';
    
    // Map language codes to locales
    const localeMap = {
      'nl': 'nl-NL',
      'en': 'en-US',
      'de': 'de-DE',
      'fr': 'fr-FR',
      'es': 'es-ES',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'ru': 'ru-RU',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'zh': 'zh-CN',
      'ar': 'ar-SA',
      'hi': 'hi-IN'
    };
    
    const locale = localeMap[currentLanguage] || 'nl-NL';
    
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  const startRecording = async () => {
    try {
      console.log('Starting recording...');
      
      // Prevent multiple simultaneous recordings
      if (recordingState !== 'idle') {
        console.log('Recording already in progress, state:', recordingState);
        return;
      }

      setError('');
      
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }

      // Check if MediaRecorder is supported
      if (!window.MediaRecorder) {
        throw new Error('MediaRecorder not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        }
      });

      // Check if the stream has audio tracks
      if (!stream.getAudioTracks().length) {
        throw new Error('No audio tracks available');
      }

      // Use supported audio format for mobile
      let mimeType = 'audio/webm;codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'audio/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = ''; // Let browser decide
          }
        }
      }

      const options = mimeType ? { mimeType } : {};
      const recorder = new MediaRecorder(stream, options);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        console.log('MediaRecorder stopped, processing audio...');
        
        // Clear timer immediately
        if (recorder.timer) {
          clearInterval(recorder.timer);
          recorder.timer = null;
        }
        
        // Set processing state
        setRecordingState('processing');
        setMediaRecorder(null);
        setRecordingTime(0);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        // Transcribe the audio if we have data
        if (audioChunks.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: recorder.mimeType || 'audio/webm' });
          await transcribeAudio(audioBlob);
        } else {
          console.warn('No audio chunks recorded');
          setRecordingState('idle');
        }
      };

      // Start recording
      recorder.start(1000);
      setMediaRecorder(recorder);
      setRecordingState('recording');
      setRecordingTime(0);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) { // Max 5 minutes
            console.log('Auto-stopping recording after 5 minutes');
            if (recorder && recorder.state !== 'inactive') {
              recorder.stop();
            }
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // Store timer reference
      recorder.timer = timer;
      
      console.log('Recording started successfully');

    } catch (error) {
      console.error('Error starting recording:', error);
      setRecordingState('idle');
      
      let errorMessage = t('microphoneAccessDenied', 'Microphone access denied. Please allow microphone access.');
      
      if (error.name === 'NotFoundError') {
        errorMessage = t('microphoneNotFound', 'Geen microfoon gevonden. Controleer of je apparaat een microfoon heeft.');
      } else if (error.name === 'NotAllowedError') {
        errorMessage = t('microphoneAccessDenied', 'Microfoon toegang geweigerd. Sta microfoon toegang toe in je browser.');
      } else if (error.name === 'NotSupportedError' || error.message.includes('not supported')) {
        errorMessage = t('audioRecordingNotSupported', 'Audio opname wordt niet ondersteund door je browser. Probeer Chrome of Safari.');
      } else if (error.name === 'NotReadableError') {
        errorMessage = t('microphoneInUse', 'Microfoon wordt gebruikt door een andere app. Sluit andere apps die de microfoon gebruiken.');
      }
      
      setError(errorMessage);
    }
  };

  const stopRecording = () => {
    console.log('Stopping recording manually...');
    if (mediaRecorder && recordingState === 'recording') {
      // Clear timer first
      if (mediaRecorder.timer) {
        clearInterval(mediaRecorder.timer);
        mediaRecorder.timer = null;
      }
      
      // Stop recording
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      
      console.log('Recording stop requested');
    }
  };

  const transcribeAudio = async (audioBlob) => {
    console.log('Starting transcription...');
    setTranscribing(true);
    try {
      // Check if the audio blob has content
      if (!audioBlob || audioBlob.size === 0) {
        throw new Error('No audio data recorded');
      }

      console.log('Audio blob size:', audioBlob.size, 'type:', audioBlob.type);

      // Create FormData to send audio file
      const formData = new FormData();
      
      // Use appropriate file extension based on blob type
      let fileName = 'recording.webm';
      if (audioBlob.type.includes('mp4')) {
        fileName = 'recording.mp4';
      } else if (audioBlob.type.includes('wav')) {
        fileName = 'recording.wav';
      }
      
      formData.append('audio', audioBlob, fileName);
      
      // Use current UI language for speech recognition
      let speechLanguage = 'nl-NL'; // Default to Dutch
      const currentLanguage = i18n.language || 'nl';
      
      // Map UI languages to Google Speech-to-Text language codes
      const languageMap = {
        'nl': 'nl-NL',
        'en': 'en-US', 
        'de': 'de-DE',
        'es': 'es-ES',
        'fr': 'fr-FR',
        'it': 'it-IT',
        'pt': 'pt-PT',
        'ru': 'ru-RU',
        'zh': 'zh-CN',
        'ja': 'ja-JP',
        'ko': 'ko-KR',
        'ar': 'ar-SA',
        'hi': 'hi-IN'
      };
      
      speechLanguage = languageMap[currentLanguage] || 'nl-NL';
      console.log('Using speech language:', speechLanguage, 'for UI language:', currentLanguage);
      formData.append('language', speechLanguage);

      const response = await axios.post(getFullUrl('/api/journal/transcribe'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 45000, // 45 second timeout for Google Speech-to-Text
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      if (response.data.success) {
        // Add transcribed text to existing content
        const transcribedText = response.data.transcription;
        if (transcribedText && transcribedText.trim()) {
          setFormData(prev => ({
            ...prev,
            content: prev.content ? `${prev.content}\n\n${transcribedText}` : transcribedText
          }));
          setError('');
        } else {
          setError(t('noSpeechDetectedRetry', 'Geen spraak gedetecteerd. Probeer opnieuw te spreken.'));
        }
      } else {
        setError(t('transcriptionFailed', 'Speech transcription failed. Please try again.'));
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      let errorMessage = t('transcriptionError', 'Error processing speech. Please try again.');
      
      if (error.response?.status === 400) {
        const apiError = error.response?.data?.error || '';
        if (apiError.includes('No speech detected')) {
          errorMessage = t('noSpeechDetected', 'No speech detected. Please speak more clearly into the microphone.');
        } else if (apiError.includes('too large')) {
          errorMessage = t('audioFileTooLarge', 'Audio file too large. Maximum 10MB allowed.');
        } else if (apiError.includes('Invalid audio format')) {
          errorMessage = t('invalidAudioFormat', 'Invalid audio format. Please try recording again.');
        } else {
          errorMessage = apiError || t('invalidAudioFormatRetry', 'Invalid audio format. Please try again.');
        }
      } else if (error.response?.status === 500) {
        const apiError = error.response?.data?.error || '';
        if (apiError.includes('Google Cloud API key')) {
          errorMessage = t('googleSpeechNotConfigured', 'Google Speech service not configured. Please contact the administrator.');
        } else if (apiError.includes('quota exceeded')) {
          errorMessage = t('googleSpeechQuotaExceeded', 'Google Speech quota exceeded. Please try again later.');
        } else {
          errorMessage = t('transcriptionServiceUnavailable', 'Transcription service temporarily unavailable.');
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = t('transcriptionTimeout', 'Transcription timeout. Audio too long or connection too slow.');
      } else if (error.message?.includes('Network Error')) {
        errorMessage = t('networkError', 'Network error. Please check your internet connection.');
      }
      
      setError(errorMessage);
    } finally {
      console.log('Transcription completed, resetting states...');
      setTranscribing(false);
      // Ensure we're back to idle state
      setRecordingState('idle');
    }
  };

  const addTag = (tagInput) => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag]
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (isLoading) {
    return (
      <div className="journal-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          {t('loading', 'Loading...')}
        </div>
      </div>
    );
  }

  return (
    <div className="journal-container">
      <PageHeader 
        user={user}
        onProfileClick={onProfileClick}
        title={t('dagboek', 'Dagboek')}
        unreadCount={unreadCount}
        onInboxClick={onInboxClick}
        onCreateClick={onCreateClick}
      />
      <div className="journal-header">
        <div className="journal-header-buttons">
          <button 
            className="new-entry-btn"
            onClick={() => {
              if (hasTodaysEntry && todaysEntry) {
                // Edit today's entry
                setFormData({
                  title: todaysEntry.title,
                  content: todaysEntry.content,
                  mood: todaysEntry.mood || '',
                  tags: todaysEntry.tags || [],
                  date: todaysEntry.date ? new Date(todaysEntry.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                });
                setEditingEntry(todaysEntry);
              } else {
                // Create new entry (for today)
                setFormData({
                  title: '',
                  content: '',
                  mood: '',
                  tags: [],
                  date: new Date().toISOString().split('T')[0]
                });
                setEditingEntry(null);
              }
              setShowCreateForm(true);
            }}
          >
            {hasTodaysEntry ? (
              <>📝 {t('editTodaysEntry', 'Edit Today')}</>
            ) : (
              <>✏️ {t('newEntry', 'New Entry')}</>
            )}
          </button>
          
          <button 
            className="calendar-entry-btn"
            onClick={() => setShowDatePicker(true)}
          >
            📅 {t('selectDate', 'Choose Date')}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError('')}>✕</button>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="journal-form-overlay">
          <div className="date-picker-modal">
            <div className="form-header">
              <h3>📅 {t('selectDate', 'Choose Date')}</h3>
              <button className="close-btn" onClick={() => setShowDatePicker(false)}>✕</button>
            </div>
            <div className="date-picker-content">
              <p>{t('selectDateHelp', 'Select a date to create or edit a journal entry for that day:')}</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]} // Don't allow future dates
                className="date-picker-input"
              />
              <div className="date-picker-actions">
                <button 
                  className="save-btn"
                  onClick={() => handleDateSelection(selectedDate)}
                  disabled={!selectedDate}
                >
                  {t('continue', 'Doorgaan')}
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setShowDatePicker(false)}
                >
                  {t('cancel', 'Annuleren')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="journal-filters">
        <div className="mood-filter">
          <label>{t('mood', 'Stemming')}:</label>
          <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)}>
            <option value="all">{t('allMoods', 'Alle stemmingen')}</option>
            {moods.map(mood => (
              <option key={mood.value} value={mood.value}>
                {mood.emoji} {mood.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tags-filter">
          <label>{t('tags', 'Tags')}:</label>
          <input
            type="text"
            placeholder={t('searchByTags', 'Zoek op tags...')}
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value)}
          />
        </div>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="journal-form-overlay">
          <div className="journal-form">
            <div className="form-header">
              <h3>
                {editingEntry && hasTodaysEntry ? 
                  t('editTodaysEntry', 'Edit Today') : 
                  editingEntry ? 
                    t('editEntry', 'Edit Entry') : 
                    hasTodaysEntry ?
                      t('appendToToday', 'Add to today') :
                      t('newEntry', 'New Entry')
                }
              </h3>
              <button className="close-btn" onClick={resetForm}>✕</button>
            </div>
            
            <div className="form-content">
              <div className="form-group">
                <label>{t('mood', 'Stemming')} <span style={{opacity: 0.6, fontSize: '12px'}}>(optioneel)</span></label>
                <div className="mood-selector-grid">
                  {moods.map(mood => (
                    <button
                      key={mood.value}
                      type="button"
                      className={`mood-card ${formData.mood === mood.value ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, mood: mood.value})}
                      style={{
                        background: formData.mood === mood.value ? mood.bg : 'var(--glass-light)',
                        borderColor: formData.mood === mood.value ? mood.color : 'rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="mood-emoji">{mood.emoji}</span>
                      <span className="mood-label">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>{t('tags', 'Tags')} <span style={{opacity: 0.6, fontSize: '12px'}}>(optioneel)</span></label>
                <div className="tags-input">
                  <input
                    type="text"
                    placeholder={t('addTag', 'Add tag...')}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="tags-list">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button onClick={() => removeTag(tag)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {t('journalContent', 'Inhoud')}
                  <div className="content-actions">
                    {/* Show start button only when idle and audio is supported */}
                    {audioSupported && recordingState === 'idle' && (
                      <button
                        type="button"
                        className="voice-input-btn"
                        onClick={startRecording}
                        title={t('startVoiceRecording', 'Start spraak opname')}
                      >
                        🎤 {t('speakEntry', 'Inspreek dagboek')}
                      </button>
                    )}
                    
                    {/* Show recording controls when recording */}
                    {recordingState === 'recording' && (
                      <div className="recording-controls">
                        <button
                          type="button"
                          className="stop-recording-btn"
                          onClick={stopRecording}
                          title={t('stopRecording', 'Stop opname')}
                        >
                          ⏹ {t('stopRecording', 'Stop opname')}
                        </button>
                        <span className="recording-time">
                          🔴 {formatRecordingTime(recordingTime)}
                        </span>
                      </div>
                    )}
                    
                    {/* Show processing indicator */}
                    {recordingState === 'processing' && (
                      <div className="transcribing-indicator">
                        <div className="spinner"></div>
                        {t('transcribing', 'Vertalen naar tekst...')}
                      </div>
                    )}
                    
                    {/* Show not supported message */}
                    {!audioSupported && (
                      <div className="audio-not-supported">
                        ⚠️ Audio opname niet beschikbaar op dit apparaat
                      </div>
                    )}
                  </div>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder={t('enterContent', 'Schrijf je gedachten of gebruik de opname knop...')}
                  rows="10"
                  maxLength="5000"
                />
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSaveEntry}>
                  {t('saveEntry', 'Invoer Opslaan')}
                </button>
                <button className="cancel-btn" onClick={resetForm}>
                  {t('cancel', 'Annuleren')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="journal-entries-section">
        {entries.length === 0 ? (
          <div className="empty-journal-state">
            <div className="empty-journal-icon">📝</div>
            <h3>{t('noEntries', 'Geen dagboek invoeren nog')}</h3>
            <p>{t('createFirstEntry', 'Creëer je eerste dagboek invoer om te beginnen')}</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry._id} className="journal-entry">
              <div className="entry-header">
                <div className="entry-info">
                  <h3 className="entry-title">{entry.title}</h3>
                  <div className="entry-meta">
                    {entry.audioFile && (
                      <span className="entry-duration">
                        <span className="meta-icon">🎵</span> 
                        {Math.floor(entry.audioFile.duration / 60)}:{(entry.audioFile.duration % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </div>
                
                {entry.mood && (
                  <div className="entry-mood-container">
                    <div 
                      className="entry-mood-display"
                      onClick={() => {
                        setExpandedMoodId(expandedMoodId === entry._id ? null : entry._id);
                      }}
                    >
                      {moods.find(m => m.value === entry.mood)?.emoji}
                    </div>
                    {expandedMoodId === entry._id && (
                      <div className="entry-mood-label">
                        {moods.find(m => m.value === entry.mood)?.label}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {entry.tags && entry.tags.length > 0 && (
                <div className="entry-tags">
                  {entry.tags.slice(0, 5).map((tag, index) => (
                    <span key={index} className="entry-tag">#{tag}</span>
                  ))}
                  {entry.tags.length > 5 && (
                    <span className="more-tags">+{entry.tags.length - 5}</span>
                  )}
                </div>
              )}

              <div className="entry-content">
                {entry.content.length > 200 ? 
                  `${entry.content.substring(0, 200)}...` : 
                  entry.content
                }
              </div>

              <div className="entry-controls">
                <div className="entry-actions">
                  <button 
                    className="edit-btn entry-action-btn"
                    onClick={() => handleEditEntry(entry)}
                  >
                    ✏️ {t('editEntry', 'Bewerken')}
                  </button>
                  <button 
                    className="delete-btn entry-action-btn" 
                    onClick={() => handleDeleteEntry(entry._id)}
                    title={t('delete', 'Verwijderen')}
                  >
                    🗑️
                  </button>
                </div>
                
                {entry.audioFile ? (
                  <div className="audio-controls">
                    <button 
                      className="play-btn entry-action-btn"
                      onClick={() => handlePlayAudio(entry)}
                    >
                      {playingEntryId === entry._id ? '⏸️' : '▶️'} 
                      {playingEntryId === entry._id ? t('pause', 'Pauzeren') : t('playVoice', 'Afspelen')}
                    </button>
                    {!entry.isShared && (
                      <button 
                        className="share-btn entry-action-btn"
                        onClick={() => handleShareEntry(entry)}
                      >
                        📤 {t('shareJournal', 'Delen')}
                      </button>
                    )}
                    {entry.isShared && (
                      <span className="shared-indicator">
                        🌟 {t('shared', 'Gedeeld')}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="generate-audio-section">
                    {/* Voice Selector */}
                    <div className="voice-selector">
                      <label>{t('selectVoice', 'Select Voice')}:</label>
                      <select 
                        value={selectedVoiceId} 
                        onChange={(e) => setSelectedVoiceId(e.target.value)}
                        className="voice-select"
                      >
                        <option value="default">{t('defaultVoice', 'Standaard Stem')}</option>
                        {userCustomVoices.map(voice => (
                          <option key={voice.voiceId} value={voice.voiceId}>
                            {voice.name} {t('customVoice', '(Eigen)')}
                          </option>
                        ))}
                      </select>
                      
                      <button 
                        className="record-voice-btn"
                        onClick={() => setShowVoiceRecorder(!showVoiceRecorder)}
                        disabled={uploadingVoice}
                      >
                        🎙️ {t('recordVoice', 'Neem Stem Op')}
                      </button>
                    </div>

                    {/* Voice Recording Interface */}
                    {showVoiceRecorder && (
                      <div className="voice-recorder">
                        <div className="voice-recorder-header">
                          <h4>{t('recordYourVoice', 'Neem Je Stem Op')}</h4>
                          <p>{t('voiceRecordingInstructions', 'Spreek 1-2 minuten duidelijk in de microfoon voor de beste kwaliteit.')}</p>
                        </div>
                        
                        <div className="voice-recording-controls">
                          {voiceRecordingState === 'idle' && (
                            <button 
                              className="start-voice-recording-btn"
                              onClick={startVoiceRecording}
                              disabled={!audioSupported}
                            >
                              🔴 {t('startRecording', 'Start Opname')}
                            </button>
                          )}
                          
                          {voiceRecordingState === 'recording' && (
                            <div className="recording-status">
                              <button 
                                className="stop-voice-recording-btn"
                                onClick={stopVoiceRecording}
                              >
                                ⏹️ {t('stopRecording', 'Stop Opname')}
                              </button>
                              <div className="voice-recording-time">
                                🔴 {Math.floor(voiceRecordingTime / 60)}:{(voiceRecordingTime % 60).toString().padStart(2, '0')}
                                <br />
                                <small>{t('targetTime', 'Doel: 1-2 minuten')}</small>
                              </div>
                            </div>
                          )}
                          
                          {voiceRecordingState === 'processing' && (
                            <div className="processing-status">
                              <div className="spinner"></div>
                              {t('processingVoice', 'Verwerken...')}
                            </div>
                          )}
                          
                          {voiceRecordingState === 'preview' && recordedVoiceBlob && (
                            <div className="voice-preview">
                              <button 
                                className="play-preview-btn"
                                onClick={playVoicePreview}
                              >
                                ▶️ {t('playPreview', 'Beluister')}
                              </button>
                              
                              <div className="voice-save-section">
                                <input 
                                  type="text" 
                                  placeholder={t('voiceNamePlaceholder', 'Naam voor je stem...')}
                                  className="voice-name-input"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      saveCustomVoice(e.target.value);
                                    }
                                  }}
                                />
                                <button 
                                  className="save-voice-btn"
                                  onClick={(e) => {
                                    const input = e.target.parentElement.querySelector('.voice-name-input');
                                    saveCustomVoice(input.value);
                                  }}
                                  disabled={uploadingVoice}
                                >
                                  {uploadingVoice ? (
                                    <><div className="spinner"></div> {t('uploading', 'Uploading...')}</>
                                  ) : (
                                    `💾 ${t('saveVoice', 'Save Voice')} (2 credits)`
                                  )}
                                </button>
                              </div>
                              
                              <button 
                                className="cancel-voice-btn"
                                onClick={cancelVoiceRecording}
                              >
                                ❌ {t('cancel', 'Annuleren')}
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {!audioSupported && (
                          <div className="audio-not-supported">
                            ⚠️ {t('audioNotSupported', 'Audio opname niet beschikbaar op dit apparaat')}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Custom Voice Management */}
                    {userCustomVoices.length > 0 && (
                      <div className="custom-voices-list">
                        <h5>{t('yourVoices', 'Je Stemmen')}:</h5>
                        {userCustomVoices.map(voice => (
                          <div key={voice.voiceId} className="custom-voice-item">
                            <span className="voice-name">{voice.name}</span>
                            <button 
                              className="delete-voice-btn"
                              onClick={() => deleteCustomVoice(voice.voiceId)}
                              title={t('deleteVoice', 'Verwijder stem')}
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button 
                      className="generate-audio-btn"
                      onClick={() => handleGenerateAudio(entry)}
                      disabled={generatingAudio === entry._id || (userCredits && userCredits.credits < 1)}
                    >
                      {generatingAudio === entry._id ? (
                        <><div className="spinner"></div> {t('generating', 'Genereren...')}</>
                      ) : (
                        `🎤 ${t('generateVoice', 'Stem Genereren')} (1 credit)`
                      )}
                    </button>
                  </div>
                )}
              </div>

              {entry.audioFile && (
                <audio 
                  id={`journal-audio-${entry._id}`}
                  preload="none"
                  onEnded={() => setPlayingEntryId(null)}
                  onPause={() => {
                    if (playingEntryId === entry._id) {
                      setPlayingEntryId(null);
                    }
                  }}
                >
                  <source 
                    src={getFullUrl(`/assets/audio/journals/${entry.audioFile.filename}`)} 
                    type="audio/mpeg" 
                  />
                </audio>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;