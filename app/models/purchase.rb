class Purchase < ActiveRecord::Base
  require 'activemerchant'
  # require 'stripe'

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
    # a = Agent.first
    # customer_id = ''
    # if a.stripe_id.nil?
    #   customer_id = create_stripe_customer(a)
    #   a.update_attributes(stripe_id: customer_id)
    # else
    #   customer_id = a.stripe_id
    # end
    response = gateway.purchase(1000, card, ip: "127.0.0.1" )
    puts response.params["source"]["id"]
  end

  # def create_stripe_customer(agent)
  #   customer = Stripe::Customer.create(email: agent.email)
  #   customer.id
  # end

end
