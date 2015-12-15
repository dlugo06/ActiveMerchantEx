Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  resources :stripe_charges
  resources :braintree, only: [:new, :create]

  root 'payments#landing'

end
