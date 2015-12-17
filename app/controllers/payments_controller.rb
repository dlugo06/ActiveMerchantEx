class PaymentsController < ApplicationController
  require 'activemerchant'

  def landing
  end

  def active_merchant
  end

  def purchase
    ActiveMerchant::Billing::Base.mode = :test

    # Paypal Gateway
    # gateway = ActiveMerchant::Billing::PaypalGateway.new(
    #   :login => ENV["PAYPAL_LOGIN"],
    #   :password => ENV["PAYPAL_PASSWORD"],
    #   :signature => ENV["PAYPAL_SIGNATURE"]
    # )

    gateway = ActiveMerchant::Billing::TrustCommerceGateway.new(:login => 'TestMerchant', :password => 'password')

    credit_card = ActiveMerchant::Billing::CreditCard.new(
      :brand              => "visa",
      :number             => "4024007148673576",
      :verification_value => "123",
      :month              => 1,
      :year               => Time.now.year+1,
      :first_name         => "Ryan",
      :last_name          => "Bates"
    )

    if credit_card.validate.empty?
      response = gateway.purchase(1000, credit_card, :ip => "127.0.0.1")
      if response.success?
        redirect_to activemerchant_path, alert: "ActiveMerchant Purchase complete!"
      else
        redirect_to activemerchant_path, alert: "Error: #{response.message}"
      end
    else
      redirect_to activemerchant_path, alert: "Error: credit card is not valid. #{credit_card.errors.full_messages.join('. ')}"
    end
  end
end
