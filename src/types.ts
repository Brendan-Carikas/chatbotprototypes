export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string | null;
  showFeedback?: boolean;
  showSuggestions?: boolean;
}

export interface FeedbackOption {
  id: string;
  label: string;
  response: string;
  subOptions?: FeedbackOption[];
}

export const POSITIVE_OPTIONS: FeedbackOption[] = [
  { id: 'fast', label: 'Fast and efficient', response: "Thanks for your feedback! We strive for speed and efficiency." },
  { id: 'helpful', label: 'Helpful resolution', response: "Glad we could help resolve your query!" },
  { id: 'knowledgeable', label: 'Knowledgeable support', response: "We appreciate your recognition of our expertise!" },
  { id: 'friendly', label: 'Friendly tone', response: "Happy you found our conversation friendly!" },
  { id: 'easy', label: 'Easy to use', response: "Thanks! We aim for a smooth, user-friendly experience." },
  { id: 'intelligent', label: 'Chatbot was intelligent', response: "Thank you! We strive to provide intelligent assistance." },
  { id: 'other', label: 'Other', response: "Thanks for your feedback!" }
];

export const NEGATIVE_OPTIONS: FeedbackOption[] = [
  { id: 'slow', label: 'Slow and inefficient', response: "We apologize for the slow performance. We're working on improving our efficiency." },
  { id: 'unhelpful', label: 'Unhelpful resolution', response: "We're sorry the resolution wasn't helpful. We'll work to improve our solutions." },
  { id: 'expertise', label: 'Lack of expertise', response: "We apologize for not meeting your expertise expectations. We're continuously improving our knowledge base." },
  { id: 'unfriendly', label: 'Unfriendly tone', response: "We're sorry about the unfriendly tone. We strive to maintain professional and friendly communication." },
  { 
    id: 'technical', 
    label: 'Technical issues', 
    response: "We apologize for the technical issues. Our team will look into resolving these problems.",
    subOptions: [
      { id: 'error', label: 'Encountered error message', response: "We apologize for the error message. Our team will investigate and fix this issue." },
      { id: 'no_response', label: 'No response', response: "We're sorry you received no response. We'll work on improving our system's reliability." }
    ]
  },
  { id: 'misunderstanding', label: 'Chatbot didn\'t understand', response: "We're sorry for the misunderstanding. We're working to improve our comprehension capabilities." },
  { id: 'other', label: 'Other', response: "We appreciate your feedback and will work on improving our service." }
];
