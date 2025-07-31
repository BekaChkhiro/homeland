# უძრავი ქონების პლატფორმის ბექენდის სპეციფიკაცია

## არქიტექტურული მიმოხილვა

ეს დოკუმენტი განსაზღვრავს Node.js, Express.js და PostgreSQL-ზე დაფუძნებული ბექენდის სისტემის მოთხოვნებს სახლების იყიდვა-გაყიდვის პლატფორმისთვის.

### ტექნოლოგიური სტეკი
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **Authentication**: JWT
- **File Storage**: AWS S3 / Local Storage
- **Real-time**: Socket.io (შეტყობინებებისთვის)
- **Email**: Nodemailer (SMTP)
- **Testing**: Jest + Supertest
- **API Documentation**: Swagger/OpenAPI

## მონაცემთა ბაზის სქემა

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'agent')),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    profile_image_url TEXT,
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Properties Table
```sql
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic Info
    property_type VARCHAR(50) NOT NULL, -- 'ბინები', 'სახლები', 'კომერციული ფართები', 'აგარაკები'
    deal_type VARCHAR(50) NOT NULL, -- 'იყიდება', 'ქირავდება', 'გირავდება', 'ქირავდება დღიურად'
    city VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    street_number VARCHAR(20),
    cadastral_code VARCHAR(50),
    
    -- Property Details
    rooms INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    total_floors INTEGER,
    floor_number INTEGER,
    building_status VARCHAR(50),
    construction_year INTEGER,
    condition VARCHAR(50),
    project_type VARCHAR(50),
    ceiling_height DECIMAL(3,2),
    heating VARCHAR(50),
    parking VARCHAR(50),
    hot_water VARCHAR(50),
    building_material VARCHAR(100),
    
    -- Additional Spaces
    has_balcony BOOLEAN DEFAULT FALSE,
    balcony_count INTEGER,
    balcony_area DECIMAL(8,2),
    has_pool BOOLEAN DEFAULT FALSE,
    pool_type VARCHAR(50),
    has_living_room BOOLEAN DEFAULT FALSE,
    living_room_area DECIMAL(8,2),
    living_room_type VARCHAR(50),
    has_loggia BOOLEAN DEFAULT FALSE,
    loggia_area DECIMAL(8,2),
    has_veranda BOOLEAN DEFAULT FALSE,
    veranda_area DECIMAL(8,2),
    has_yard BOOLEAN DEFAULT FALSE,
    yard_area DECIMAL(8,2),
    has_storage BOOLEAN DEFAULT FALSE,
    storage_area DECIMAL(8,2),
    storage_type VARCHAR(50),
    
    -- Price & Area
    area DECIMAL(8,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    price_per_sqm DECIMAL(8,2),
    currency VARCHAR(3) DEFAULT 'GEL',
    
    -- Contact Info
    contact_name VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(255),
    
    -- Descriptions
    description_georgian TEXT,
    description_english TEXT,
    description_russian TEXT,
    
    -- Status & Admin
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sold', 'inactive')),
    featured BOOLEAN DEFAULT FALSE,
    priority INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES users(id),
    expires_at TIMESTAMP
);
```

### Property Features Tables
```sql
CREATE TABLE property_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    feature_type VARCHAR(50) NOT NULL, -- 'features', 'advantages', 'furniture_appliances', 'tags'
    feature_value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_property_features_property_id ON property_features(property_id);
CREATE INDEX idx_property_features_type ON property_features(feature_type);
```

### Property Images Table
```sql
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_order INTEGER DEFAULT 0,
    is_main BOOLEAN DEFAULT FALSE,
    alt_text VARCHAR(255),
    file_size INTEGER,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_property_images_property_id ON property_images(property_id);
```

### Favorites Table
```sql
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);
```

### Messages/Inquiries Table
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    recipient_id UUID NOT NULL REFERENCES properties(user_id),
    sender_name VARCHAR(255),
    sender_email VARCHAR(255),
    sender_phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Advertisements Table
```sql
CREATE TABLE advertisements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    advertiser_name VARCHAR(255) NOT NULL,
    advertiser_email VARCHAR(255) NOT NULL,
    advertiser_phone VARCHAR(50),
    
    -- Ad Content
    image_url TEXT NOT NULL,
    click_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    
    -- Placement & Scheduling
    placement_id VARCHAR(50) NOT NULL, -- references frontend placement IDs
    placement_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- Pricing & Performance
    price DECIMAL(8,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'GEL',
    views_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'expired')),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES users(id)
);
```

### User Activity Log Table
```sql
CREATE TABLE user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50), -- 'property', 'user', 'advertisement'
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### System Settings Table
```sql
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints სპეციფიკაცია

### Authentication Endpoints

#### POST /api/auth/register
მომხმარებლის რეგისტრაცია
```json
{
  "fullName": "სახელი გვარი",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+995555123456"
}
```

#### POST /api/auth/login
მომხმარებლის ავტორიზაცია
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/logout
მომხმარებლის გასვლა

#### POST /api/auth/refresh
JWT Token-ის განახლება

#### POST /api/auth/forgot-password
პაროლის აღდგენა

#### POST /api/auth/reset-password
პაროლის ცვლილება

### User Management Endpoints

#### GET /api/users/profile
მომხმარებლის პროფილის მონაცემები

#### PUT /api/users/profile
პროფილის მონაცემების განახლება

#### POST /api/users/upload-avatar
პროფილის სურათის ატვირთვა

#### GET /api/users/balance
მომხმარებლის ბალანსი

#### GET /api/users/activity
მომხმარებლის აქტივობის ლოგი

### Property Management Endpoints

#### GET /api/properties
ყველა უძრავი ქონების სია (ფილტრებით)
Query Parameters:
- page, limit (pagination)
- city, propertyType, dealType
- priceMin, priceMax
- areaMin, areaMax
- bedrooms, bathrooms
- search (title, address)
- featured (boolean)

#### GET /api/properties/:id
კონკრეტული უძრავი ქონების დეტალები

#### POST /api/properties
ახალი უძრავი ქონების დამატება (authentication required)

#### PUT /api/properties/:id
უძრავი ქონების განახლება (owner only)

#### DELETE /api/properties/:id
უძრავი ქონების წაშლა (owner/admin only)

#### POST /api/properties/:id/images
სურათების ატვირთვა

#### DELETE /api/properties/:id/images/:imageId
სურათის წაშლა

#### POST /api/properties/:id/favorite
ფავორიტებში დამატება/წაშლა

#### GET /api/properties/:id/similar
მსგავსი უძრავი ქონების სია

#### POST /api/properties/:id/contact
კონტაქტის მესიჯი (inquiry)

### Admin Endpoints

#### GET /api/admin/dashboard/stats
ადმინისტრატორის პანელის სტატისტიკა

#### GET /api/admin/properties
ყველა უძრავი ქონება (admin view)

#### PUT /api/admin/properties/:id/approve
უძრავი ქონების დამტკიცება

#### PUT /api/admin/properties/:id/reject
უძრავი ქონების უარყოფა

#### GET /api/admin/users
მომხმარებლების სია

#### PUT /api/admin/users/:id/status
მომხმარებლის სტატუსის ცვლილება

#### GET /api/admin/advertisements
რეკლამების მართვა

#### POST /api/admin/advertisements
ახალი რეკლამის დამატება

#### PUT /api/admin/advertisements/:id
რეკლამის განახლება

#### DELETE /api/admin/advertisements/:id
რეკლამის წაშლა

### Advertisement Endpoints

#### GET /api/ads/placements
რეკლამის ადგილების სია

#### GET /api/ads/placement/:placementId
კონკრეტული ადგილის რეკლამა

#### POST /api/ads/:id/click
რეკლამის კლიკის აღრიცხვა

#### POST /api/ads/:id/view
რეკლამის ნახვის აღრიცხვა

### Search & Filter Endpoints

#### GET /api/search/suggestions
ძებნის შეთავაზებები

#### GET /api/search/locations
ლოკაციების სია

#### GET /api/filters/options
ფილტრების ოფციები

## მიდლვეარები

### Authentication Middleware
```javascript
const authenticateToken = (req, res, next) => {
  // JWT token verification
};

const requireAdmin = (req, res, next) => {
  // Admin role verification
};
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 login attempts per window
});
```

### File Upload Middleware
```javascript
const multer = require('multer');
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});
```

## უსაფრთხოება და დაცულობა

### პაროლის ჰეშირება
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
```

### CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Input Validation
```javascript
const { body, validationResult } = require('express-validator');

const validateProperty = [
  body('propertyType').notEmpty().withMessage('Property type is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('area').isNumeric().withMessage('Area must be numeric'),
  body('totalPrice').isNumeric().withMessage('Price must be numeric'),
];
```

## ფაილების მართვა

### სურათების ატვირთვა
- მაქსიმალური ზომა: 5MB per file
- მხარდაჭერილი ფორმატები: JPEG, PNG, WebP
- რეზოლუციის ოპტიმიზაცია: Sharp library
- CDN ინტეგრაცია: AWS CloudFront

### ფაილების სტრუქტურა
```
uploads/
├── properties/
│   ├── {propertyId}/
│   │   ├── original/
│   │   ├── thumbnails/
│   │   └── optimized/
├── users/
│   └── avatars/
└── advertisements/
```

## რეალ-ტაიმ ფუნქციონალობა

### Socket.io Events
```javascript
// New message notification
socket.emit('new_message', {
  propertyId: 'uuid',
  senderId: 'uuid',
  message: 'text'
});

// Property status update
socket.emit('property_status_changed', {
  propertyId: 'uuid',
  status: 'approved'
});
```

## ანალიტიკა და მონიტორინგი

### Metrics Collection
- Property view tracking
- Search query analytics
- User behavior analytics
- Advertisement performance
- System performance metrics

### Logging
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## ტესტირება

### Unit Tests
- Authentication services
- Property validation
- Database operations
- File upload handling

### Integration Tests
- API endpoints
- Database transactions
- Third-party integrations

### Test Structure
```
tests/
├── unit/
│   ├── auth.test.js
│   ├── properties.test.js
│   └── users.test.js
├── integration/
│   ├── api.test.js
│   └── database.test.js
└── fixtures/
    └── testData.js
```

## Development & Deployment

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/homeland
DB_HOST=localhost
DB_PORT=5432
DB_NAME=homeland
DB_USER=postgres
DB_PASSWORD=password

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRE=7d

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=homeland-uploads
AWS_REGION=us-east-1

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Application
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Package.json Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "migrate": "npx knex migrate:latest",
    "seed": "npx knex seed:run",
    "lint": "eslint .",
    "build": "npm run migrate && npm run seed"
  }
}
```

### Required Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.11.3",
    "knex": "^2.5.1",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.32.6",
    "aws-sdk": "^2.1467.0",
    "nodemailer": "^6.9.7",
    "socket.io": "^4.7.2",
    "express-validator": "^7.0.1",
    "express-rate-limit": "^6.10.0",
    "winston": "^3.10.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "eslint": "^8.50.0"
  }
}
```

## მონაცემთა მიგრაცია

### Initial Setup
```sql
-- Database creation
CREATE DATABASE homeland;
CREATE USER homeland_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE homeland TO homeland_user;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for full-text search
```

### Indexes for Performance
```sql
-- Properties search indexes
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_deal_type ON properties(deal_type);
CREATE INDEX idx_properties_price ON properties(total_price);
CREATE INDEX idx_properties_area ON properties(area);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_featured ON properties(featured);
CREATE INDEX idx_properties_created_at ON properties(created_at);

-- Full-text search
CREATE INDEX idx_properties_search ON properties 
USING gin(to_tsvector('english', title || ' ' || description_georgian || ' ' || street));

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
```

## უსაფრთხოების რეკომენდაციები

1. **API Rate Limiting** - ყველა endpoint-ისთვის
2. **Input Sanitization** - SQL Injection-ის თავიდან აცილება
3. **HTTPS Only** - production-ში მხოლოდ HTTPS
4. **Password Policies** - მინიმუმ 8 სიმბოლო, რთული პაროლები
5. **File Upload Security** - ფაილის ტიპის შემოწმება
6. **CORS Configuration** - მხოლოდ authorized origins
7. **Sensitive Data** - არასდროს log-ში შეინახოს passwords/tokens
8. **Database Connections** - connection pooling და prepared statements

## მოცულობითი მონაცემების მართვა

### Database Connection Pooling
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

### Caching Strategy
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache popular properties
const cacheKey = `properties:featured`;
const cachedData = await client.get(cacheKey);
```

### Pagination
```javascript
const getProperties = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const query = `
    SELECT * FROM properties 
    WHERE status = 'approved' 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `;
  return await pool.query(query, [limit, offset]);
};
```

ეს სპეციფიკაცია მოიცავს ყველა აუცილებელ კომპონენტს, რომელიც საჭიროა უძრავი ქონების პლატფორმის ბექენდის სრულყოფილი ამოქმედებისთვის.