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
  - [ ] update contact info
- [-] companies
  - [x] ~~create~~
  - [x] ~~read single company~~
  - [ ] read specified companies (query pattern)
  - [x] ~~update company info~~
  - [x] ~~destroy company~~
- [ ] conditions
- [ ] events
- [-] items
  - [-] create item
    - [ ] upload images to external service
    - [x] ~~store in DB~~
  - [x] ~~read individual item~~
  - [x] ~~update item info~~
  - [x] ~~destroy item~~
  - [ ] read specified items (query pattern)
- [ ] storageLocations
- [ ] uses
- [ ] subscriptions

---
## Mobile

### Components
- [x] **~~Native Google Play Services login (Android)~~**
- [x] **Native Google Play Services login/web login (iOS)**
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