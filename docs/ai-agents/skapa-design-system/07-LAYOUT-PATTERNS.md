# 07 - Layout Patterns

**Category:** Layout & Composition  
**Last Updated:** November 4, 2025  
**Source:** Skapa Design System (skapa.ikea.net) - OCR Extracted Nov 2, 2025

---

## Overview

Layout patterns provide responsive, accessible page structures using Skapa's grid system and spacing tokens. These patterns ensure consistent visual hierarchy across breakpoints.

---

## 1. Grid System

### 12-Column Responsive Grid

**Breakpoints:**
```javascript
const breakpoints = {
  xs: 0,      // Mobile portrait
  sm: 600,    // Mobile landscape / Small tablet
  md: 900,    // Tablet
  lg: 1200,   // Desktop
  xl: 1440,   // Large desktop
  xxl: 1920   // Extra large desktop
};
```

### Grid Container
```jsx
<Container maxWidth="lg" padding={24}>
  {/* Content constrained to max-width */}
</Container>
```

**Max Widths:**
- `sm`: 600px
- `md`: 900px
- `lg`: 1200px
- `xl`: 1440px
- `full`: 100%

### Grid Layout
```jsx
<Grid container spacing={16}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <ProductCard />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <ProductCard />
  </Grid>
  {/* Repeat for more items */}
</Grid>
```

**Responsive Columns:**
```jsx
// 1 column mobile, 2 tablet, 3 desktop, 4 large
<Grid
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap={16}
>
  {items.map(item => (
    <Grid.Item key={item.id}>
      <Card {...item} />
    </Grid.Item>
  ))}
</Grid>
```

---

## 2. Page Layouts

### Single Column Layout
**Use:** Content-heavy pages, articles, forms

```jsx
<Page>
  <AppBar />
  <Container maxWidth="md">
    <Stack spacing={32}>
      <Hero />
      <Content />
      <Sidebar />
    </Stack>
  </Container>
  <Footer />
</Page>
```

### Two-Column Layout
**Use:** Content + sidebar, product listings with filters

```jsx
<Page>
  <AppBar />
  <Container maxWidth="xl">
    <Grid container spacing={24}>
      <Grid item xs={12} md={3}>
        <Sidebar>
          <FilterPanel />
        </Sidebar>
      </Grid>
      <Grid item xs={12} md={9}>
        <Main>
          <ProductGrid />
        </Main>
      </Grid>
    </Grid>
  </Container>
  <Footer />
</Page>
```

### Three-Column Layout
**Use:** Dashboards, complex data displays

```jsx
<Container maxWidth="xl">
  <Grid container spacing={16}>
    <Grid item xs={12} lg={3}>
      <LeftSidebar />
    </Grid>
    <Grid item xs={12} lg={6}>
      <MainContent />
    </Grid>
    <Grid item xs={12} lg={3}>
      <RightSidebar />
    </Grid>
  </Grid>
</Container>
```

---

## 3. Common Page Templates

### Product Listing Page

```jsx
<Page>
  <AppBar>
    <AppBar.Logo />
    <AppBar.Search />
    <AppBar.Cart />
  </AppBar>
  
  <Container maxWidth="xl">
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/products">Products</Breadcrumb>
      <Breadcrumb current>Living Room</Breadcrumb>
    </Breadcrumbs>
    
    <Grid container spacing={24}>
      {/* Filters Sidebar */}
      <Grid item xs={12} md={3}>
        <Card>
          <Card.Header>
            <Card.Title>Filters</Card.Title>
          </Card.Header>
          <Card.Body>
            <FilterGroup>
              <Accordion>
                <Accordion.Item value="category">
                  <Accordion.Header>Category</Accordion.Header>
                  <Accordion.Content>
                    <CheckboxGroup>
                      <Checkbox>Sofas</Checkbox>
                      <Checkbox>Tables</Checkbox>
                      <Checkbox>Chairs</Checkbox>
                    </CheckboxGroup>
                  </Accordion.Content>
                </Accordion.Item>
                
                <Accordion.Item value="price">
                  <Accordion.Header>Price Range</Accordion.Header>
                  <Accordion.Content>
                    <Slider
                      min={0}
                      max={1000}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </FilterGroup>
          </Card.Body>
        </Card>
      </Grid>
      
      {/* Product Grid */}
      <Grid item xs={12} md={9}>
        <Stack spacing={16}>
          <Flex justify="space-between" align="center">
            <Text>Showing 24 of 156 products</Text>
            <SegmentedControl value={view}>
              <Button value="grid">Grid</Button>
              <Button value="list">List</Button>
            </SegmentedControl>
          </Flex>
          
          <Grid columns={{ xs: 2, sm: 3, lg: 4 }} gap={16}>
            {products.map(product => (
              <CompactCard key={product.id} variant="product">
                <CompactCard.Image
                  src={product.image}
                  aspectRatio="1:1"
                />
                <CompactCard.Title>{product.name}</CompactCard.Title>
                <CompactCard.Price>{product.price}</CompactCard.Price>
              </CompactCard>
            ))}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  </Container>
  
  <Footer />
</Page>
```

### Product Detail Page

```jsx
<Page>
  <AppBar />
  
  <Container maxWidth="lg">
    <Breadcrumbs />
    
    <Grid container spacing={32}>
      {/* Product Images */}
      <Grid item xs={12} md={6}>
        <Carousel>
          {product.images.map((img, i) => (
            <Carousel.Item key={i}>
              <Image src={img} aspectRatio="1:1" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Grid>
      
      {/* Product Info */}
      <Grid item xs={12} md={6}>
        <Stack spacing={24}>
          <div>
            <Text size="small" color="secondary">
              {product.category}
            </Text>
            <Heading level={1}>{product.name}</Heading>
            <ProductIdentifier>
              {product.articleNumber}
            </ProductIdentifier>
          </div>
          
          <Rating value={product.rating} count={product.reviews} />
          
          <PriceModule>
            <Price value={product.price} size="large" />
            <Price.Family value={product.familyPrice} />
          </PriceModule>
          
          <Stack spacing={12}>
            <Select
              label="Color"
              value={selectedColor}
              onChange={setSelectedColor}
            >
              {product.colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
            
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={product.stock}
            />
          </Stack>
          
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={addToCart}
          >
            Add to cart
          </Button>
          
          <Accordion>
            <Accordion.Item value="details">
              <Accordion.Header>Product Details</Accordion.Header>
              <Accordion.Content>
                {product.details}
              </Accordion.Content>
            </Accordion.Item>
            
            <Accordion.Item value="delivery">
              <Accordion.Header>Delivery & Assembly</Accordion.Header>
              <Accordion.Content>
                {product.deliveryInfo}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Grid>
    </Grid>
  </Container>
  
  <Footer />
</Page>
```

### Checkout Page

```jsx
<Page>
  <AppBar minimal />
  
  <Container maxWidth="lg">
    <Heading level={1}>Checkout</Heading>
    
    <Grid container spacing={32}>
      {/* Checkout Form */}
      <Grid item xs={12} md={7}>
        <Stack spacing={32}>
          <Card>
            <Card.Header>
              <Card.Title>1. Delivery Information</Card.Title>
            </Card.Header>
            <Card.Body>
              <FormField>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </FormField>
              
              <FormField>
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </FormField>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>2. Payment Method</Card.Title>
            </Card.Header>
            <Card.Body>
              <RadioGroup>
                <Radio value="card">Credit Card</Radio>
                <Radio value="paypal">PayPal</Radio>
                <Radio value="invoice">Invoice</Radio>
              </RadioGroup>
            </Card.Body>
          </Card>
        </Stack>
      </Grid>
      
      {/* Order Summary */}
      <Grid item xs={12} md={5}>
        <Card sticky top={80}>
          <Card.Header>
            <Card.Title>Order Summary</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack spacing={16}>
              {cartItems.map(item => (
                <Flex key={item.id} justify="space-between">
                  <Text>{item.name} × {item.quantity}</Text>
                  <Price value={item.total} />
                </Flex>
              ))}
              
              <Divider />
              
              <Flex justify="space-between">
                <Text weight="bold">Total</Text>
                <Price value={total} size="large" weight="bold" />
              </Flex>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" size="large" fullWidth>
              Place Order
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid>
  </Container>
</Page>
```

---

## 4. Responsive Patterns

### Mobile-First Breakpoints

```jsx
// Stack on mobile, side-by-side on tablet+
<Stack spacing={16} direction={{ xs: 'column', md: 'row' }}>
  <Box flex={1}>Content 1</Box>
  <Box flex={1}>Content 2</Box>
</Stack>

// Hide on mobile, show on desktop
<Box display={{ xs: 'none', md: 'block' }}>
  Desktop only content
</Box>

// Show on mobile, hide on desktop
<Box display={{ xs: 'block', md: 'none' }}>
  Mobile only content
</Box>
```

---

## Summary

### Layout System

| Pattern | Use Case | Complexity | Responsive |
|---------|----------|------------|------------|
| **Single Column** | Content pages, forms | Low | ✅ Yes |
| **Two Column** | Listing + filters | Medium | ✅ Yes |
| **Three Column** | Dashboards, complex data | High | ✅ Yes |
| **Grid** | Product listings, cards | Medium | ✅ Yes |

### Page Templates

| Template | Components Used | Complexity |
|----------|----------------|------------|
| **Product Listing** | AppBar, Grid, Card, Filters, Accordion | Medium |
| **Product Detail** | Carousel, Rating, Price Module, Accordion | Medium |
| **Checkout** | Form, Card, Sticky Summary | Medium-High |

---

**Next:** [08-CWDS-SUBSYSTEM.md](./08-CWDS-SUBSYSTEM.md) - Coworker Design System

**Previous:** [06-NAVIGATION-AND-SPECIALTY.md](./06-NAVIGATION-AND-SPECIALTY.md) - Navigation, Media, Commerce

**Back to:** [README.md](./README.md) - Documentation Index
