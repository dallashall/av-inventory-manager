# TODO

## Backend

### Models
- [ ] subscriptions
  - [ ] expiration date
  - [ ] origination date
  - [ ] renew-by date

### CRUD
- [-] users
  - [x] ~~create via Google OAuth2~~
  - [x] ~~read via Google OAuth2~~
  - [x] ~~update contact info~~
  - [x] ~~sync permissions~~
- [x] companies
  - [x] ~~create~~
  - [x] ~~read single company~~
  - [x] ~~update company info~~
  - [x] ~~destroy company~~
  - [x] add members **untested**
  - [ ] invite members via email
    - [ ] automatically create join for existing members *security issues*
    - [ ] notification email? *feature request*
    - [x] Store pending memberships in DB with status *feature request*
    - [x] ~~send email to potential users~~
    - [x] ~~provide link for users to sign-in/signup and autmatically add to team~~
      - [x] ~~generate jwt for team id~~
      - [x] ~~use teamId jwt and userId jwt to create join~~
    - [x] ~~deep links for app (Android)~~
  - [x] add admins **untested**
  - [ ] add inventoryManagers
- [x] conditions
- [ ] events
- [-] items
  - [-] create item
    - [ ] upload images to external service
    - [x] ~~store in DB~~
  - [x] ~~read individual item~~
  - [x] ~~update item info~~
  - [x] ~~destroy item~~
  - [ ] read specified items (query pattern)
- [x] storageLocations
- [ ] uses
- [ ] subscriptions

### Routes
- [x] ~~Protect based on JWT from auth~~
- [ ] Protect based on subscription (integrate into initial signin)

---
## Mobile

### Components
- [x] **~~Native Google Play Services login (Android)~~**
- [-] **Native Google Play Services login/web login (iOS)**
- [ ] **Event List**
  - [ ] Events Assigned to user
  - [ ] Unfilled events
  - [ ] Future events
  - [ ] Recent events
  - [ ] Events with outstanding inventory chekouts
- [ ] **Event Detail**
  - [ ] Assignment details
    - [ ] Show assignee details
    - [ ] Show native contact method hooks for assignee
  - [ ] Inventory
    - [ ] Show reserved inventory
    - [ ] Edit inventory (assignees/managers)
  - [ ] Details
    - [ ] Pull and format details from GCal/Backend
- [ ] **Inventory List**
  - [ ] All Inventory
  - [ ] Available Inventory
    - [ ] Add to event (assignee/managers)
  - [ ] My Checked-out inventory
    - [ ] Auto-return inventory (to last location or home location)
    - [ ] Return Inventory
  - [ ] Checked-out inventory
    - [ ] Return Inventory
- [ ] **Profile**
- [ ] **Inventory**
  - [ ] Add inventory (admin/managers)
    - [ ] Add Photo (external service)
    - [ ] Add details (including location)
- [ ] **Locations**
  - [ ] List items by location
  - [ ] Add location
- [ ] **Events**
  - [ ] Create Events
    - [ ] Creates event on GCal
    - [ ] Can be created based on existing (non-used) GCal event