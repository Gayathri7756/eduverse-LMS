# EduVerse - Enrollment Validation Test Checklist

## Pre-Test Setup
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Browser console open (F12)
- [ ] No errors in console

## Test 1: Phone Number Validation

### Valid Phone Numbers
- [ ] 9876543210 - Accepted ✓
- [ ] 8765432109 - Accepted ✓
- [ ] 7654321098 - Accepted ✓
- [ ] 6543210987 - Accepted ✓

### Invalid Phone Numbers
- [ ] 1234567890 - Rejected (starts with 1) ✗
- [ ] 2345678901 - Rejected (starts with 2) ✗
- [ ] 98765432 - Rejected (8 digits) ✗
- [ ] 987654321098 - Rejected (12 digits) ✗
- [ ] 987654321A - Rejected (contains letter) ✗

### Phone Field Behavior
- [ ] Shows hint "(10 digits, starts with 6-9)"
- [ ] Max length is 10 characters
- [ ] Error message appears for invalid input
- [ ] Error clears when valid input entered
- [ ] Red border on error
- [ ] Normal border when valid

## Test 2: Zip Code Validation

### Valid Zip Codes
- [ ] 400001 - Accepted ✓
- [ ] 110001 - Accepted ✓
- [ ] 560001 - Accepted ✓
- [ ] 700001 - Accepted ✓

### Invalid Zip Codes
- [ ] 40001 - Rejected (5 digits) ✗
- [ ] 4000010 - Rejected (7 digits) ✗
- [ ] 40000A - Rejected (contains letter) ✗
- [ ] 4000-01 - Rejected (contains dash) ✗

### Zip Code Field Behavior
- [ ] Shows hint "(6 digits)"
- [ ] Max length is 6 characters
- [ ] Error message appears for invalid input
- [ ] Error clears when valid input entered
- [ ] Red border on error
- [ ] Normal border when valid

## Test 3: City Dropdown with Custom Input

### Select from Dropdown
- [ ] Click City field
- [ ] Dropdown shows 25 major cities
- [ ] Type "Mum" → Shows "Mumbai"
- [ ] Click "Mumbai" → Field shows "Mumbai"
- [ ] Dropdown closes after selection

### Custom City Input
- [ ] Type "MyCity" in City field
- [ ] Dropdown shows "MyCity" as option
- [ ] Click "MyCity" → Field shows "MyCity"
- [ ] Can proceed with custom city

### City Search
- [ ] Type "Del" → Shows "Delhi"
- [ ] Type "Ban" → Shows "Bangalore"
- [ ] Type "Che" → Shows "Chennai"
- [ ] Clear field → Shows all 25 cities again

### City Field Behavior
- [ ] Shows hint "(Select or type)"
- [ ] Dropdown appears on focus
- [ ] Dropdown appears on typing
- [ ] Dropdown closes on selection
- [ ] Error message if empty
- [ ] Red border on error

## Test 4: State Dropdown with Custom Input

### Select from Dropdown
- [ ] Click State field
- [ ] Dropdown shows all 30 states/UTs
- [ ] Type "Maha" → Shows "Maharashtra"
- [ ] Click "Maharashtra" → Field shows "Maharashtra"
- [ ] Dropdown closes after selection

### Custom State Input
- [ ] Type "MyState" in State field
- [ ] Dropdown shows "MyState" as option
- [ ] Click "MyState" → Field shows "MyState"
- [ ] Can proceed with custom state

### State Search
- [ ] Type "Kar" → Shows "Karnataka"
- [ ] Type "Tam" → Shows "Tamil Nadu"
- [ ] Type "Uta" → Shows "Uttarakhand"
- [ ] Clear field → Shows all states again

### State Field Behavior
- [ ] Shows hint "(Select or type)"
- [ ] Dropdown appears on focus
- [ ] Dropdown appears on typing
- [ ] Dropdown closes on selection
- [ ] Error message if empty
- [ ] Red border on error

## Test 5: Email Validation

### Valid Emails
- [ ] john@example.com - Accepted ✓
- [ ] user.name@domain.co.in - Accepted ✓
- [ ] test123@test.org - Accepted ✓

### Invalid Emails
- [ ] john@example - Rejected (no TLD) ✗
- [ ] @example.com - Rejected (no username) ✗
- [ ] john.example.com - Rejected (no @) ✗

## Test 6: Full Registration Form

### Complete Valid Form
- [ ] Full Name: John Doe
- [ ] Email: john@example.com
- [ ] Phone: 9876543210
- [ ] Address: 123 Main Street
- [ ] City: Mumbai (select from dropdown)
- [ ] State: Maharashtra (select from dropdown)
- [ ] Zip Code: 400001
- [ ] All fields valid (no red borders)
- [ ] "Continue to Payment" button enabled
- [ ] Click button → Goes to payment step

### Form with Errors
- [ ] Leave Full Name empty → Error shown
- [ ] Enter invalid email → Error shown
- [ ] Enter invalid phone → Error shown
- [ ] Leave Address empty → Error shown
- [ ] Leave City empty → Error shown
- [ ] Leave State empty → Error shown
- [ ] Enter invalid zip → Error shown
- [ ] "Continue to Payment" button disabled
- [ ] Cannot proceed to payment

## Test 7: Payment Method Selection

### Payment Methods Available
- [ ] Paytm 🔵 - Visible
- [ ] PhonePe 🟣 - Visible
- [ ] Google Pay 🔴 - Visible
- [ ] Credit Card 💳 - Visible

### Payment Method Selection
- [ ] Paytm selected by default
- [ ] Can click to select PhonePe
- [ ] Can click to select Google Pay
- [ ] Can click to select Credit Card
- [ ] Only one can be selected at a time
- [ ] Selected method highlighted in blue

### Payment Summary
- [ ] Shows "Course Price: ₹X"
- [ ] Shows "Tax (18%): ₹Y"
- [ ] Shows "Total Amount: ₹Z"
- [ ] Total = Price + Tax
- [ ] Amount shown in green
- [ ] "Pay Now" button shows total amount

## Test 8: Complete Enrollment Flow

### Step 1: Registration
- [ ] Fill all fields with valid data
- [ ] No error messages
- [ ] Click "Continue to Payment"
- [ ] Modal shows payment step

### Step 2: Payment
- [ ] Payment methods visible
- [ ] Payment summary correct
- [ ] Select payment method
- [ ] Click "Pay Now"
- [ ] Modal shows "Processing your payment..."

### Step 3: Processing
- [ ] Spinner animation shows
- [ ] "Processing your payment..." message
- [ ] "Do not close this window" warning
- [ ] Wait 2 seconds
- [ ] Modal closes automatically

### Step 4: Success
- [ ] Modal closes
- [ ] Course appears in "My Learning"
- [ ] Progress bar shows 0%
- [ ] Course thumbnail visible
- [ ] "Start Learning" button available

## Test 9: Error Handling

### Network Error
- [ ] Simulate network error
- [ ] Error message shown
- [ ] Can click "Back" to retry
- [ ] Can close modal

### Invalid Payment
- [ ] Simulate payment failure
- [ ] Error message shown
- [ ] Back to payment step
- [ ] Can retry payment

### Missing Fields
- [ ] Try to submit with empty fields
- [ ] All errors shown
- [ ] Cannot proceed
- [ ] Can fill fields and retry

## Test 10: Multiple Enrollments

### Enroll in Multiple Courses
- [ ] Enroll in Course 1 (React)
- [ ] Course appears in "My Learning"
- [ ] Go back to homepage
- [ ] Enroll in Course 2 (Node.js)
- [ ] Course appears in "My Learning"
- [ ] Both courses visible in dashboard
- [ ] Each has separate progress

## Test 11: Data Persistence

### After Enrollment
- [ ] Refresh page
- [ ] Course still in "My Learning"
- [ ] Progress still shows 0%
- [ ] Can click to watch videos

### Activity Tracking
- [ ] Watch video for 1+ minute
- [ ] Activity logged every minute
- [ ] Can check activity logs
- [ ] Duration recorded correctly

## Test 12: UI/UX

### Form Appearance
- [ ] All fields properly aligned
- [ ] Labels clear and visible
- [ ] Placeholders helpful
- [ ] Error messages in red
- [ ] Hints visible below fields

### Dropdown Appearance
- [ ] Dropdown properly positioned
- [ ] Options scrollable if many
- [ ] Hover effect on options
- [ ] Click selects option
- [ ] Dropdown closes after selection

### Payment Form
- [ ] Payment methods clearly visible
- [ ] Radio buttons work correctly
- [ ] Selected method highlighted
- [ ] Summary clearly formatted
- [ ] Total amount prominent

### Processing Screen
- [ ] Spinner animation smooth
- [ ] Messages clear
- [ ] Cannot close during processing
- [ ] Auto-closes on success

## Test 13: Validation Messages

### Phone Number Errors
- [ ] "Phone number is required" - When empty
- [ ] "Phone number must be 10 digits starting with 6-9" - When invalid

### Zip Code Errors
- [ ] "Zip code is required" - When empty
- [ ] "Zip code must be 6 digits" - When invalid

### City/State Errors
- [ ] "City is required" - When empty
- [ ] "State is required" - When empty

### Email Errors
- [ ] "Email is required" - When empty
- [ ] "Invalid email format" - When invalid

### Payment Errors
- [ ] "Please select a payment method" - When not selected

## Test 14: Edge Cases

### Special Characters
- [ ] Name with apostrophe: O'Brien - Accepted ✓
- [ ] Address with numbers: 123 Main St - Accepted ✓
- [ ] City with space: New Delhi - Accepted ✓

### Maximum Length
- [ ] Phone: 10 digits max (cannot type more)
- [ ] Zip: 6 digits max (cannot type more)
- [ ] Name: Can be long (no limit)

### Copy-Paste
- [ ] Can paste phone number
- [ ] Can paste email
- [ ] Can paste address
- [ ] Validation works on pasted data

## Test 15: Browser Compatibility

### Chrome
- [ ] All features work
- [ ] Validation works
- [ ] Dropdowns work
- [ ] Payment processing works

### Firefox
- [ ] All features work
- [ ] Validation works
- [ ] Dropdowns work
- [ ] Payment processing works

### Safari
- [ ] All features work
- [ ] Validation works
- [ ] Dropdowns work
- [ ] Payment processing works

## Final Checklist

- [ ] All phone number validations pass
- [ ] All zip code validations pass
- [ ] City dropdown works with search
- [ ] State dropdown works with search
- [ ] Custom city/state input works
- [ ] Payment method selection works
- [ ] Complete enrollment flow works
- [ ] Course appears in "My Learning"
- [ ] Activity tracking works
- [ ] No console errors
- [ ] No UI glitches
- [ ] All error messages clear
- [ ] All success messages show
- [ ] Ready for production

## Notes

- Test on different screen sizes (mobile, tablet, desktop)
- Test with different browsers
- Test with slow network (DevTools throttling)
- Test with JavaScript disabled (should show graceful error)
- Test with different payment methods
- Test with different cities/states
