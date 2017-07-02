# DB Schema
(All tables have a primary `id` key)
## users
| Column          | Type    | Required | Unique  | References |
|-----------------|---------|----------|---------|------------|
| username        | string  | `true`   | `true`  | -          |
| first_name      | string  | `true`   | `false` | -          |
| last_name       | string  | `true`   | `false` | -          |
| email           | string  | `true`   | `true`  | -          |
| password_digest | string  | `true`   | `false` | -          |
| phone           | integer | `false`  | `true`  | -          |
| profile_img_url | string  | `false`  | `false` | -          |

## inventory
| Column       | Type    | Required   | Unique  | References    |
|--------------|---------|------------|---------|---------------|
| name         | string  | `true`     | `false` | -             |
| desc         | text    | `false`    | `false` | -             |
| unique_num   | integer | `false`    | `true`  | -             |
| condition_id | integer | default: 1 | `false` | conditions.id |
| creator_id   | integer | `true`     | `false` | users.id      |

## conditions
| Column | Type   | Required                  | Unique  | Foreign Key |
|--------|--------|---------------------------|---------|-------------|
| name   | string | `true`                    | `true`  | -           |
| symbol | string | `true`                    | `false` | -           |
| color  | string | default: rgb(255,255,255) | false   | -           |


## storage_locations
| Column            | Type    | Required | Unique  | Foreign Key  |
|-------------------|---------|----------|---------|--------------|
| short_description | string  | `true`   | `false` | -            |
| long_description  | text    | `false`  | `false` | -            |
| company_id        | integer | `true`   | `false` | companies.id |

## events
| Column      | Type   | Required | Unique  | Foreign Key |
|-------------|--------|----------|---------|-------------|
| calendar_id | string | `true`   | `false` | -           |
| event_id    | string | `true`   | `false` | -           |

## companies
| Column      | Type    | Required | Unique  | Foreign Key |
|-------------|---------|----------|---------|-------------|
| name        | string  | `true`   | ` true` | -           |
| creator_id  | integer | `true`   | `false` | users.id    |
| description | text    | `false`  | `false` | -           |
| logo_url    | string  | `false`  | `false` | -           |

## administrators
| Column     | Type    | Required | Unique  | Foreign Key  |
|------------|---------|----------|---------|--------------|
| user_id    | integer | `true`   | `false` | users.id     |
| company_id | integer | `true`   | `false` | companies.id |

## inventory_managers
| Column     | Type    | Required | Unique  | Foreign Key  |
|------------|---------|----------|---------|--------------|
| user_id    | integer | `true`   | `false` | users.id     |
| company_id | integer | `true`   | `false` | companies.id |

## event_assignments
| Column   | Type    | Required | Unique  | Foreign Key |
|----------|---------|----------|---------|-------------|
| event_id | integer | `true`   | `false` | events.id   |
| user_id  | integer | `true`   | `false` | users.id    |

## volunteers
| Column   | Type    | Required | Unique  | Foreign Key |
|----------|---------|----------|---------|-------------|
| user_id  | integer | `true`   | `false` | users.id    |
| event_id | integer | `true`   | `false` | events.id   |

## assignment_managers
| Column     | Type    | Required | Unique  | Foreign Key  |
|------------|---------|----------|---------|--------------|
| user_id    | integer | `true`   | `false` | users.id     |
| company_id | integer | `true`   | `false` | companies.id |

## equipment_in_use
| Column             | Type    | Required | Unique  | Foreign Key  |
|--------------------|---------|----------|---------|--------------|
| inventory_id       | integer | `true`   | `true`  | inventory.id |
| event_id           | integer | `true`   | `false` | events.id    |
| checkout_person_id | integer | `true`   | `false` | users.id     |

## use_log
| Column             | Type    | Required | Unique  | Foreign Key  |
|--------------------|---------|----------|---------|--------------|
| inventory_id       | integer | `false`  | `true`  | inventory.id |
| event_id           | integer | `true`   | `false` | events.id    |
| checkout_person_id | integer | `true`   | `false` | users.id     |
| checkin_person_id  | integer | `false`  | `false` | users.id     |
