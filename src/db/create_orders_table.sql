CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    -- Customer Information
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    
    -- Shipping Information
    shipping_address TEXT NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    shipping_zip_code VARCHAR(20) NOT NULL,
    
    -- Order Details
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status VARCHAR(50) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Payment Information
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    
    -- Additional Information
    items_json JSONB NOT NULL, -- Stores the cart items with their details
    gift_note TEXT,
    newsletter_discount_applied BOOLEAN DEFAULT FALSE,
    discount_code VARCHAR(50),
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_phone CHECK (customer_phone ~* '^\+?[0-9\s-()]{8,}$'),
    CONSTRAINT valid_amounts CHECK (
        subtotal >= 0 AND
        shipping_cost >= 0 AND
        discount_amount >= 0 AND
        total_amount >= 0
    )
);

-- Index for faster queries
CREATE INDEX idx_order_status ON Orders(order_status);
CREATE INDEX idx_customer_email ON Orders(customer_email);
CREATE INDEX idx_order_date ON Orders(order_date);

-- Trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON Orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Sample comment for the table
COMMENT ON TABLE Orders IS 'Stores all order information including customer details, shipping information, and order items';