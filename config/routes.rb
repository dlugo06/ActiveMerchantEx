Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  resources :stripe_charges
  resources :braintree, only: [:new, :create]
  get '/activemerchant' => 'payments#active_merchant'
  post '/activemerchant' => 'payments#purchase'
  root 'payments#landing'

end
