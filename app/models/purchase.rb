class Purchase < ActiveRecord::Base
  require 'activemerchant'

  def active_purchase(card)
    ActiveMerchant::Billing::Base.mode = :test

    # Paypal Gateway
    # gateway = ActiveMerchant::Billing::PaypalGateway.new(
    #   :login => ENV["PAYPAL_LOGIN"],
    #   :password => ENV["PAYPAL_PASSWORD"],
    #   :signature => ENV["PAYPAL_SIGNATURE"]
    # )

    gateway = ActiveMerchant::Billing::TrustCommerceGateway.new(:login => 'TestMerchant', :password => 'password')

    response = gateway.purchase(1000, card, :ip => "127.0.0.1")
    raise
  end
end
