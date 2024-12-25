CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Customer Information
    customer_first_name VARCHAR(100),
    customer_last_name VARCHAR(100),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    
    -- Shipping Information
    shipping_address TEXT,
    shipping_country VARCHAR(100),
    shipping_zip_code VARCHAR(20),
    
    -- Order Details
    subtotal DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    newsletter_discount DECIMAL(10,2),
    final_total DECIMAL(10,2),
    
    -- Gift Information
    gift_note TEXT,
    is_gift BOOLEAN DEFAULT false,
    
    -- Order Items (JSON array containing all items with their details)
    items JSONB,
    
    -- Payment Information
    payment_status VARCHAR(50),
    payment_method VARCHAR(50),
    
    -- Additional Information
    order_status VARCHAR(50) DEFAULT 'pending',
    tracking_number VARCHAR(100),
    notes TEXT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT positive_amounts CHECK (
        subtotal >= 0 AND
        shipping_cost >= 0 AND
        final_total >= 0
    )
);

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

-- Index for common queries
CREATE INDEX idx_orders_customer_email ON Orders(customer_email);
CREATE INDEX idx_orders_order_status ON Orders(order_status);
CREATE INDEX idx_orders_order_date ON Orders(order_date);