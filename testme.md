# Test Plan for ChatSuggestionsCouncil Component

## 1. Initial Rendering Tests

### 1.1 Basic Rendering
- **Objective**: Verify that the ChatSuggestionsCouncil component renders correctly
- **Steps**:
  1. Navigate to the council chat page (/#/council)
  2. Observe the initial greeting messages
- **Expected Results**: 
  - First message shows "👋 Hi, I am Arto your helpful AI assistant" without timestamp
  - Second message shows "Select an option below or type a brief message so I can better assist you." with timestamp
  - Initial suggestions are displayed: "When are my bins collected?", "I need to report a housing repair", "What's my rent balance?"

### 1.2 UI Elements Check
- **Objective**: Verify all UI elements are present and properly styled
- **Steps**:
  1. Check that all suggestion buttons are visible and clickable
  2. Verify the chat input field is present
  3. Confirm the send button is visible
- **Expected Results**: All UI elements render with proper Material Design styling and are responsive

## 2. Suggestion Button Tests

### 2.1 Bins Collection Suggestion
- **Objective**: Test the "When are my bins collected?" suggestion
- **Steps**:
  1. Click on the "When are my bins collected?" suggestion
- **Expected Results**:
  - User message appears with the selected text
  - Bot responds with the bins collection information
  - Initial suggestions disappear
  - Response includes timestamp and feedback buttons

### 2.2 Housing Repair Suggestion
- **Objective**: Test the "I need to report a housing repair" suggestion flow
- **Steps**:
  1. Click on the "I need to report a housing repair" suggestion
  2. Provide a name when prompted
  3. Provide an email when prompted
  4. Provide a phone number when prompted
  5. Provide a location when prompted
  6. Provide information about when the issue was noticed
- **Expected Results**:
  - Each step in the flow prompts for specific information
  - Final summary displays all provided information
  - A reference number is generated
  - Summary includes options "No, I'm good" and "I still need help"

### 2.3 Rent Balance Suggestion
- **Objective**: Test the "What's my rent balance?" suggestion
- **Steps**:
  1. Click on the "What's my rent balance?" suggestion
- **Expected Results**:
  - User message appears with the selected text
  - Bot responds with the rent balance information
  - Initial suggestions disappear
  - Response includes timestamp and feedback buttons

## 3. Keyword Detection Tests

### 3.1 Bins Collection Keywords
- **Objective**: Test keyword detection for bins collection
- **Steps**:
  1. Type and send messages containing keywords:
     - "When will my bins be collected?"
     - "What day is waste collection?"
     - "I need information about recycling"
- **Expected Results**: Bot responds with the bins collection information for each message

### 3.2 Housing Repair Keywords
- **Objective**: Test keyword detection for housing repair
- **Steps**:
  1. Type and send messages containing keywords:
     - "I need to fix my kitchen sink"
     - "There's a broken window in my living room"
     - "I need maintenance for my heating system"
- **Expected Results**: Bot starts the housing repair flow for each message, asking for name first

### 3.3 Rent Balance Keywords
- **Objective**: Test keyword detection for rent balance
- **Steps**:
  1. Type and send messages containing keywords:
     - "How much rent do I owe?"
     - "Can I check my account balance?"
     - "I want to make a payment on my rent"
- **Expected Results**: Bot responds with the rent balance information for each message

## 4. Sequential Flow Tests

### 4.1 Complete Housing Repair Flow
- **Objective**: Test the complete sequential flow for housing repair
- **Steps**:
  1. Start the housing repair flow (via suggestion or keyword)
  2. Complete each step with valid information:
     - Name: "John Doe"
     - Email: "john.doe@example.com"
     - Phone: "07700 900123"
     - Location: "Kitchen sink"
     - When noticed: "Yesterday morning"
  3. Review the summary
- **Expected Results**: 
  - Flow progresses correctly through all steps
  - Summary displays all provided information accurately
  - Reference number is generated

### 4.2 Interrupting the Flow
- **Objective**: Test what happens when a user tries to change topics mid-flow
- **Steps**:
  1. Start the housing repair flow
  2. After providing name, send a message about bins instead of providing email
- **Expected Results**: 
  - The flow should continue expecting an email
  - The system should not get distracted by the unrelated message

## 5. Edge Case Tests

### 5.1 Empty Messages
- **Objective**: Test handling of empty messages
- **Steps**:
  1. Try to send an empty message
- **Expected Results**: Send button should be disabled or an error message should appear

### 5.2 Very Long Messages
- **Objective**: Test handling of very long messages
- **Steps**:
  1. Type and send a very long message (500+ characters)
- **Expected Results**: Message should be accepted and displayed correctly, possibly with scrolling

### 5.3 Special Characters
- **Objective**: Test handling of special characters
- **Steps**:
  1. Send messages containing special characters, emojis, and symbols
- **Expected Results**: Messages should display correctly without breaking the layout

## 6. Accessibility Tests

### 6.1 Keyboard Navigation
- **Objective**: Test keyboard accessibility
- **Steps**:
  1. Use Tab key to navigate through all interactive elements
  2. Use Enter/Space to activate buttons
- **Expected Results**: All interactive elements should be accessible via keyboard

### 6.2 Screen Reader Compatibility
- **Objective**: Test screen reader compatibility
- **Steps**:
  1. Enable a screen reader (e.g., VoiceOver, NVDA)
  2. Navigate through the chat interface
- **Expected Results**: All elements should be properly announced by the screen reader

## 7. Responsive Design Tests

### 7.1 Mobile View
- **Objective**: Test responsiveness on mobile devices
- **Steps**:
  1. Open the chat on a mobile device or use browser developer tools to simulate mobile dimensions
  2. Interact with all features
- **Expected Results**: UI should adapt to smaller screens, all features should remain functional

### 7.2 Tablet View
- **Objective**: Test responsiveness on tablet devices
- **Steps**:
  1. Open the chat on a tablet device or simulate tablet dimensions
  2. Interact with all features
- **Expected Results**: UI should adapt appropriately to medium-sized screens

## 8. Performance Tests

### 8.1 Message History Loading
- **Objective**: Test performance with many messages
- **Steps**:
  1. Generate a large number of messages (20+)
  2. Scroll through the message history
- **Expected Results**: Scrolling should be smooth, no significant performance degradation

### 8.2 Rapid Interaction
- **Objective**: Test system response to rapid interactions
- **Steps**:
  1. Click multiple suggestion buttons in quick succession
  2. Send multiple messages rapidly
- **Expected Results**: System should handle rapid interactions gracefully without errors

## 9. Integration Tests

### 9.1 Integration with ChatContextCouncil
- **Objective**: Verify proper integration with the context provider
- **Steps**:
  1. Test various interactions that require context state changes
  2. Verify that state is maintained correctly between interactions
- **Expected Results**: All state-dependent features work correctly

### 9.2 Integration with ChatInputCouncil
- **Objective**: Verify proper integration with the input component
- **Steps**:
  1. Test message sending through the input component
  2. Verify that messages are properly displayed in the chat
- **Expected Results**: Messages flow correctly from input to display

## 10. Regression Tests

### 10.1 Previous Functionality
- **Objective**: Ensure that existing functionality hasn't been broken
- **Steps**:
  1. Test all previously implemented features
- **Expected Results**: All existing features continue to work as expected