# A/V Inventory Manager Docs

## Features

### Google Calendar Integration

### Automatic Reminders to Check Inventory back in

### Flexible Permissions for Users and Administrators

---

## Web Functionality
Users actions:
* Sign-up/Signin using Google account
* Pay for Company access using Stripe (subscription?)
* Create Company after paying for access/ signing up for time-limited trial
  * Automatically sets user to be Administrator for Company
* Disables company after time-trail, unless paid

### Companies
Administrators:
* Can edit Company info:
  * Name
  * Description
  * Logo
* Invite other members
* View Company members
* Manage Inventory
* Assign Inventory Managers


## App Functionality

### Users
Users actions:
* Sign up using Google account
  * Saves basic user info into the database:
    * first_name
    * last_name
    * email
    * phone (provided manually)
    * profile_img_url
* Sign in using Google account
* Sign-up/Signin sends JWT to client when successful

### 

