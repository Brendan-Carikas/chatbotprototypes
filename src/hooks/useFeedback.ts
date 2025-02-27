import { create } from 'zustand';
import { FeedbackOption, POSITIVE_OPTIONS, NEGATIVE_OPTIONS } from '../types';

interface FeedbackStore {
  isOpen: boolean;
  type: 'positive' | 'negative' | null;
  messageId: string | null;
  submitted: boolean;
  selectedOption: FeedbackOption | null;
  submittedMessageIds: Set<string>;
  openFeedback: (type: 'positive' | 'negative', messageId: string) => void;
  close: () => void;
  submitFeedback: (optionId: string, customFeedback?: string) => void;
  hasFeedback: (messageId: string) => boolean;
}

export const useFeedback = create<FeedbackStore>((set, get) => ({
  isOpen: false,
  type: null,
  messageId: null,
  submitted: false,
  selectedOption: null,
  submittedMessageIds: new Set<string>(),
  openFeedback: (type, messageId) => set({ 
    isOpen: true, 
    type, 
    messageId, 
    submitted: false,
    selectedOption: null 
  }),
  close: () => set({ 
    isOpen: false, 
    type: null, 
    messageId: null, 
    submitted: false,
    selectedOption: null 
  }),
  submitFeedback: (optionId, customFeedback) => {
    const options = POSITIVE_OPTIONS.concat(NEGATIVE_OPTIONS);
    let selectedOption = options.find(opt => opt.id === optionId);
    
    // Handle sub-options
    if (!selectedOption) {
      for (const option of options) {
        if (option.subOptions) {
          const subOption = option.subOptions.find(sub => optionId.includes(sub.id));
          if (subOption) {
            selectedOption = {
              ...subOption,
              id: optionId,
              label: `${option.label} - ${subOption.label}`,
              response: subOption.response
            };
            break;
          }
        }
      }
    }

    if (selectedOption) {
      const { messageId, submittedMessageIds } = get();
      if (messageId) {
        submittedMessageIds.add(messageId);
      }
      
      set({ 
        submitted: true, 
        selectedOption,
        submittedMessageIds: new Set(submittedMessageIds)
      });

      // Log the feedback
      console.log('Feedback submitted:', {
        messageId: get().messageId,
        optionId,
        customFeedback,
        selectedOption
      });

      // Close the feedback drawer after 3 seconds
      setTimeout(() => {
        set({ 
          isOpen: false, 
          type: null, 
          messageId: null, 
          submitted: false,
          selectedOption: null 
        });
      }, 3000);
    }
  },
  hasFeedback: (messageId: string) => get().submittedMessageIds.has(messageId)
}));