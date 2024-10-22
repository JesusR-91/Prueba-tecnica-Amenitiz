class ProductsController < ApplicationController
  # GET /products
  def index
    begin
      products = JSON.parse(File.read("#{Rails.root}/app/data/products.json"))
      render json: products
    rescue Errno::ENOENT
      render json: { error: "Products data not found" }, status: 500
    end
  end
  
  # POST /checkout
  def checkout
    basket = params[:basket] || []
    total = calculate_total(basket)
    render json: { total: total.round(2) }  # round to 2 decimals
  end
  
  # Aux Functions
  private
  
  # Total calculation
  def calculate_total(basket)
    begin
      products = JSON.parse(File.read("#{Rails.root}/app/data/products.json"))
    rescue Errno::ENOENT
      return 0  # If there's an error reading the file
    end
    
    # Hash product code => ammount
    cart = basket.tally
    total = 0
    
    cart.each do |code, quantity|
      product = products.find { |p| p["code"] == code }
      
      if product
        total += apply_discounts(product, quantity)
      else
        # Product not found
        Rails.logger.warn("Product with code #{code} not found")
      end
    end
    total
  end
  
  # Discounts
  def apply_discounts(product, quantity)
    case product["code"]
    when "GR1"
      # Buy one, get one free (Green Tea)
      (quantity / 2 + quantity % 2) * product["price"]
    when "SR1"
      # Strawberries bulk discount
      if quantity >= 3
        quantity * 4.50
      else
        quantity * product["price"]
      end
    when "CF1"
      # Coffee bulk discount
      if quantity >= 3
        quantity * (product["price"] * 2 / 3)
      else
        quantity * product["price"]
      end
    else
      # Other products calculation
      quantity * product["price"]
    end
  end
end

