class Transaction < ActiveRecord::Base
  require 'activemerchant'
  belongs_to :agent

  def active_purchase(card)
    ActiveMerchant::Billing::Base.mode = :test

    # # Paypal Gateway
    # gateway = ActiveMerchant::Billing::PaypalGateway.new(
    #   :login => ENV["PAYPAL_LOGIN"],
    #   :password => ENV["PAYPAL_PASSWORD"],
    #   :signature => ENV["PAYPAL_SIGNATURE"]
    # )

    # #Stripe Gateway
    gateway = ActiveMerchant::Billing::StripeGateway.new(:login => ENV['STRIPE_SECRET_KEY'])

    # #Test Gateway
    # gateway = ActiveMerchant::Billing::TrustCommerceGateway.new(:login => 'TestMerchant', :password => 'password')

    #Extract
    response = gateway.purchase(1000, card, ip: "127.0.0.1" )

    #Transform
    card_id = response.params["source"]["id"]
    stripe_transaction_id = response.params["id"]

    #Load
    {response: response, card_id: card_id, stripe_transaction_id: stripe_transaction_id}
  end
end
