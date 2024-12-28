# Database Schema Documentation with Examples

This document describes the tables in the database schema, along with their purposes, field descriptions, and real-world examples of usage.

---

## **1. `users`**
**Description**: Stores user details for authentication and management.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each user.          |
| `name`      | VARCHAR(255)        | Full name of the user.                    |
| `email`     | VARCHAR(255)        | Email address, must be unique.            |
| `password`  | VARCHAR(255)        | Encrypted password for authentication.    |
| `status`    | ENUM('active', 'inactive') | Current status of the user.            |
| `createdAt` | DATETIME            | Timestamp when the user was created.      |
| `updatedAt` | DATETIME            | Timestamp of the last update to the user. |

### **Example**
Register a new user, John Doe:
```sql
INSERT INTO `users` (`name`, `email`, `password`, `status`)
VALUES ('John Doe', 'john.doe@example.com', 'hashed_password', 'active');
```

---

## **2. `roles`**
**Description**: Dynamically defines roles for assigning permissions to users.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each role.          |
| `name`      | VARCHAR(255)        | Role name (e.g., "Admin").                |
| `description`| TEXT               | Description of the role's purpose.        |
| `createdAt` | DATETIME            | Timestamp when the role was created.      |
| `updatedAt` | DATETIME            | Timestamp of the last update to the role. |

### **Example**
Define an "Admin" role:
```sql
INSERT INTO `roles` (`name`, `description`)
VALUES ('Admin', 'System administrator with full access.');
```

---

## **3. `permissions`**
**Description**: Stores granular permissions that can be assigned to roles.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each permission.    |
| `name`      | VARCHAR(255)        | Permission name (e.g., "manage_leads").   |
| `description`| TEXT               | Description of the permission's purpose.  |
| `createdAt` | DATETIME            | Timestamp when the permission was created.|
| `updatedAt` | DATETIME            | Timestamp of the last update to the permission.|

### **Example**
Define a `manage_leads` permission:
```sql
INSERT INTO `permissions` (`name`, `description`)
VALUES ('manage_leads', 'Permission to manage customer leads.');
```

---

## **4. `role_permissions`**
**Description**: Associates roles with permissions (many-to-many).

| Field          | Type                | Description                                |
|-----------------|---------------------|--------------------------------------------|
| `role_id`       | BIGINT(20) UNSIGNED| Reference to the `roles` table.          |
| `permission_id` | BIGINT(20) UNSIGNED| Reference to the `permissions` table.    |

### **Example**
Grant the "Admin" role the `manage_leads` permission:
```sql
INSERT INTO `role_permissions` (`role_id`, `permission_id`)
VALUES (1, 1); -- Assuming `1` is the ID of the Admin role and `1` is the ID of manage_leads.
```

---

## **5. `user_roles`**
**Description**: Links users to roles dynamically (many-to-many).

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `user_id`   | BIGINT(20) UNSIGNED| Reference to the `users` table.           |
| `role_id`   | BIGINT(20) UNSIGNED| Reference to the `roles` table.           |

### **Example**
Assign the "Admin" role to John Doe:
```sql
INSERT INTO `user_roles` (`user_id`, `role_id`)
VALUES (1, 1); -- Assuming `1` is the ID of John Doe and the Admin role.
```

---

## **6. `agents`**
**Description**: Tracks agents, their user profiles, and sales targets.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each agent.         |
| `user_id`       | BIGINT(20) UNSIGNED| Reference to the `users` table.           |
| `monthly_target` | DECIMAL(10,2)      | Monthly sales target for the agent.       |
| `createdAt`     | DATETIME            | Timestamp when the agent was created.     |
| `updatedAt`     | DATETIME            | Timestamp of the last update to the agent.|

### **Example**
Assign an agent profile to John Doe with a $10,000 monthly target:
```sql
INSERT INTO `agents` (`user_id`, `monthly_target`)
VALUES (1, 10000);
```

---

## **7. `leads`**
**Description**: Tracks customer lead information, including contact details and interests.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each lead.          |
| `name`          | VARCHAR(255)        | Name of the lead.                         |
| `phone`         | VARCHAR(15)         | Phone number of the lead.                 |
| `email`         | VARCHAR(255)        | Email address of the lead.                |
| `comments`      | TEXT                | Additional comments about the lead.       |
| `parts`         | VARCHAR(255)        | Parts of interest to the lead.            |
| `makeModels`    | VARCHAR(255)        | Vehicle make and model.                   |
| `years`         | VARCHAR(50)         | Year(s) of interest.                      |
| `states`        | VARCHAR(255)        | States of interest.                       |
| `subscription`  | BOOLEAN             | Whether the lead has subscribed.          |
| `trackingId`    | VARCHAR(255)        | Tracking ID for the lead.                 |
| `eventTimestamp`| DATETIME            | Timestamp of the event.                   |
| `createdAt`     | DATETIME            | Timestamp when the lead was created.      |
| `updatedAt`     | DATETIME            | Timestamp of the last update to the lead. |

### **Example**
Add a lead interested in "Air Pump" parts for an "AMC American" car model:
```sql
INSERT INTO `leads` (`name`, `phone`, `email`, `parts`, `makeModels`, `years`, `states`, `subscription`)
VALUES ('Jane Smith', '1234567890', 'jane.smith@example.com', 'Air Pump', 'AMC American', '1973', 'California', TRUE);
```

---

(Continued due to size constraints...)

---

## **8. `quotes`**
**Description**: Tracks quotes provided to leads, including details and status.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each quote.         |
| `lead_id`       | BIGINT(20) UNSIGNED| Reference to the `leads` table.           |
| `agent_id`      | BIGINT(20) UNSIGNED| Reference to the `agents` table.          |
| `quote_details` | JSON                | Detailed breakdown of the quote.          |
| `total_price`   | DECIMAL(10,2)       | Total price of the quote.                 |
| `discount`      | DECIMAL(10,2)       | Discount applied to the quote.            |
| `status`        | ENUM                | Status of the quote (`pending`, `accepted`, `declined`).|
| `createdAt`     | DATETIME            | Timestamp when the quote was created.     |
| `updatedAt`     | DATETIME            | Timestamp of the last update to the quote.|

### **Example**
Generate a quote for Jane Smith with a total price of $500:
```sql
INSERT INTO `quotes` (`lead_id`, `agent_id`, `quote_details`, `total_price`, `status`)
VALUES (1, 1, '{"items": [{"name": "Air Pump", "quantity": 1, "price": 500}]}', 500, 'pending');
```

---

## **9. `sales`**
**Description**: Tracks sales made by agents to leads.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each sale.          |
| `agent_id`      | BIGINT(20) UNSIGNED| Reference to the `agents` table.          |
| `lead_id`       | BIGINT(20) UNSIGNED| Reference to the `leads` table.           |
| `amount`        | DECIMAL(10,2)       | Amount of the sale.                       |
| `sale_date`     | DATE                | Date of the sale.                         |

### **Example**
Record a sale of $500 for Jane Smith by John Doe:
```sql
INSERT INTO `sales` (`agent_id`, `lead_id`, `amount`, `sale_date`)
VALUES (1, 1, 500, '2024-01-01');
```

---

## **10. `tickets`**
**Description**: Tracks support tickets related to leads or agents.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each ticket.        |
| `lead_id`       | BIGINT(20) UNSIGNED| Reference to the `leads` table.           |
| `agent_id`      | BIGINT(20) UNSIGNED| Reference to the `agents` table.          |
| `subject`       | VARCHAR(255)        | Subject of the ticket.                    |
| `description`   | TEXT                | Detailed description of the issue.        |
| `status`        | ENUM                | Status of the ticket (`open`, `in-progress`, `closed`).|
| `priority`      | ENUM                | Priority level (`low`, `medium`, `high`). |
| `createdAt`     | DATETIME            | Timestamp when the ticket was created.    |
| `updatedAt`     | DATETIME            | Timestamp of the last update to the ticket.|

### **Example**
Create a ticket for Jane Smith to resolve an issue with her order:
```sql
INSERT INTO `tickets` (`lead_id`, `agent_id`, `subject`, `description`, `status`, `priority`)
VALUES (1, 1, 'Order Issue', 'Customer reported an issue with the air pump.', 'open', 'medium');
```

---

## **11. `notifications`**
**Description**: Tracks real-time notifications sent to users.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each notification.  |
| `user_id`       | BIGINT(20) UNSIGNED| Reference to the `users` table.           |
| `message`       | TEXT                | Notification message content.             |
| `type`          | ENUM                | Type of notification (`info`, `warning`, `error`).|
| `status`        | ENUM                | Status of the notification (`unread`, `read`).|
| `createdAt`     | DATETIME            | Timestamp when the notification was created.|

### **Example**
Send a notification to John Doe about a new lead assignment:
```sql
INSERT INTO `notifications` (`user_id`, `message`, `type`, `status`)
VALUES (1, 'You have been assigned a new lead: Jane Smith.', 'info', 'unread');
```

---

## **12. `payment_gateway_transactions`**
**Description**: Logs raw payment transactions with external gateways like Stripe or PayPal.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each transaction.   |
| `transaction_id`| VARCHAR(255)        | Unique ID assigned by the payment gateway.|
| `gateway`       | ENUM                | Payment gateway name (`stripe`, `paypal`, etc.).|
| `amount`        | DECIMAL(10,2)       | Transaction amount.                       |
| `status`        | ENUM                | Status of the transaction (`pending`, `completed`, `failed`).|
| `createdAt`     | DATETIME            | Timestamp when the transaction occurred.  |

### **Example**
Record a transaction of $500 with Stripe:
```sql
INSERT INTO `payment_gateway_transactions` (`transaction_id`, `gateway`, `amount`, `status`)
VALUES ('txn_123ABC', 'stripe', 500, 'completed');
```

---

## **13. `payment_history`**
**Description**: Tracks payments specific to leads, linking them to gateway transactions.

| Field           | Type                | Description                                |
|------------------|---------------------|--------------------------------------------|
| `id`            | BIGINT(20) UNSIGNED| Unique identifier for each payment.       |
| `lead_id`       | BIGINT(20) UNSIGNED| Reference to the `leads` table.           |
| `transaction_id`| BIGINT(20) UNSIGNED| Reference to the `payment_gateway_transactions` table.|
| `amount`        | DECIMAL(10,2)       | Payment amount.                           |
| `payment_date`  | DATETIME            | Date and time of the payment.             |

### **Example**
Link a payment made by Jane Smith to the Stripe transaction:
```sql
INSERT INTO `payment_history` (`lead_id`, `transaction_id`, `amount`, `payment_date`)
VALUES (1, 1, 500, '2024-01-01');
```

---

## **14. `sessions`**
**Description**: Tracks user sessions for authentication and monitoring.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each session.       |
| `user_id`   | BIGINT(20) UNSIGNED| Reference to the `users` table.           |
| `token`     | VARCHAR(255)        | Unique session token.                     |
| `expires_at`| DATETIME            | Expiration date and time for the session. |
| `createdAt` | DATETIME            | Timestamp when the session was created.   |

### **Example**
Create a session for John Doe:
```sql
INSERT INTO `sessions` (`user_id`, `token`, `expires_at`)
VALUES (1, 'session_token_123', '2024-01-07 23:59:59');
```

---

## **15. `system_analytics`**
**Description**: Tracks system-wide metrics such as performance and activity.

| Field         | Type                | Description                                |
|---------------|---------------------|--------------------------------------------|
| `id`          | BIGINT(20) UNSIGNED| Unique identifier for each analytics record.|
| `metric_name` | VARCHAR(255)        | Name of the metric being tracked.         |
| `metric_value`| DECIMAL(10,2)       | Value of the metric.                      |
| `recorded_at` | DATETIME            | Timestamp when the metric was recorded.   |

### **Example**
Record the number of new leads generated today:
```sql
INSERT INTO `system_analytics` (`metric_name`, `metric_value`, `recorded_at`)
VALUES ('New Leads', 10, '2024-01-01 00:00:00');
```

---

## **16. `templates`**
**Description**: Stores reusable email and SMS templates.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each template.      |
| `type`      | ENUM                | Type of template (`email`, `sms`).        |
| `name`      | VARCHAR(255)        | Name of the template.                     |
| `subject`   | VARCHAR(255)        | Subject of the template (for emails only).|
| `content`   | TEXT                | Content of the template.                  |
| `createdAt` | DATETIME            | Timestamp when the template was created.  |
| `updatedAt` | DATETIME            | Timestamp of the last update to the template.|

### **Example**
Create an email template for sending quotes:
```sql
INSERT INTO `templates` (`type`, `name`, `subject`, `content`)
VALUES ('email', 'Quote Template', 'Your Quote from Our Company', 'Hello, here is your quote: {{quote_details}}.');
```

---

## **17. `notes`**
**Description**: Tracks notes related to leads or agents.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each note.          |
| `user_id`   | BIGINT(20) UNSIGNED| Reference to the `users` table.           |
| `lead_id`   | BIGINT(20) UNSIGNED| Reference to the `leads` table (optional).|
| `content`   | TEXT                | Content of the note.                      |
| `createdAt` | DATETIME            | Timestamp when the note was created.      |
| `updatedAt` | DATETIME            | Timestamp of the last update to the note. |

### **Example**
Add a note about Jane Smith’s preference for quick delivery:
```sql
INSERT INTO `notes` (`user_id`, `lead_id`, `content`)
VALUES (1, 1, 'Customer prefers expedited shipping.');
```

---

## **18. `reminders`**
**Description**: Tracks reminders for users.

| Field       | Type                | Description                                |
|-------------|---------------------|--------------------------------------------|
| `id`        | BIGINT(20) UNSIGNED| Unique identifier for each reminder.      |
| `user_id`   | BIGINT(20) UNSIGNED| Reference to the `users` table.           |
| `content`   | TEXT                | Reminder content.                         |
| `due_date`  | DATETIME            | Due date for the reminder.                |
| `priority`  | ENUM                | Priority level (`low`, `medium`, `high`). |
| `createdAt` | DATETIME            | Timestamp when the reminder was created.  |

### **Example**
Set a reminder for John Doe to follow up with Jane Smith:
```sql
INSERT INTO `reminders` (`user_id`, `content`, `due_date`, `priority`)
VALUES (1, 'Follow up with Jane Smith regarding her quote.', '2024-01-03 10:00:00', 'high');
```