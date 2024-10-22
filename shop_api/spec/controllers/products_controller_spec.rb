require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  let(:products_data) do
    [
      { "code" => "GR1", "name" => "Green Tea", "price" => 3.11 },
      { "code" => "SR1", "name" => "Strawberries", "price" => 5.00 },
      { "code" => "CF1", "name" => "Coffee", "price" => 11.23 }
    ]
  end

  before do
    # Simular el archivo de productos
    allow(File).to receive(:read).and_return(products_data.to_json)
  end

  describe "POST #checkout" do
    it "calculates the total price for the basket GR1,GR1" do
      post :checkout, params: { basket: ["GR1", "GR1"] }
      expect(JSON.parse(response.body)["total"]).to eq(3.11)
    end

    it "calculates the total price for the basket SR1,SR1,GR1,SR1" do
      post :checkout, params: { basket: ["SR1", "SR1", "GR1", "SR1"] }
      expect(JSON.parse(response.body)["total"]).to eq(16.61)
    end

    it "calculates the total price for the basket GR1,CF1,SR1,CF1,CF1" do
      post :checkout, params: { basket: ["GR1", "CF1", "SR1", "CF1", "CF1"] }
      expect(JSON.parse(response.body)["total"]).to eq(30.57)
    end
  end
end
