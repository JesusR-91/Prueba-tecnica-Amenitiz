Rails.application.routes.draw do
  
  resources :products, only: [:index]
  post 'checkout', to: 'products#checkout'

end
