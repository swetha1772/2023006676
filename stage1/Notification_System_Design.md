###Stage 1 - Priority Notification System
Approach
The goal is to display the top 10 most important unread notifications by combining priority (weight) and recency (timestamp).
 1. Priority Weight

Each notification type is assigned a weight:

 Placement → 3 (Highest)
 Result → 2
 Event → 1 (Lowest)

 2. Recency

Each notification has a timestamp. More recent notifications are considered more important.

 3. Combined Scoring

To ensure both priority and recency are considered together, a combined score is calculated:

Score = (Weight × Large Constant) + Timestamp

This ensures:

 Higher priority notifications always rank above lower ones
 Within the same priority, newer notifications come first

4. Sorting
 Notifications are sorted in descending order of the computed score
Top 10 notifications are selected

5. API Integration

 Notifications are fetched from the provided API endpoint
 Authorization token is used to access the protected route

 6. Logging

 A custom logging middleware is used throughout the implementation
 Logs track API calls, sorting steps, and final output

 7. Efficient Handling of New Notifications

To efficiently maintain top 10 notifications:

A Min Heap (Priority Queue) of size 10 can be used
When a new notification arrives:

Compare with the smallest element
Replace if higher priority
This avoids sorting the entire dataset repeatedly

Output

The system returns the top 10 notifications based on combined priority and recency.