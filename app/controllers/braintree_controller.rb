class BraintreeController < ApplicationController
  require 'activemerchant'

  def new
    gon.client_token = generate_client_token
  end

  def create
    @result = Braintree::Transaction.sale(amount: "10.00", payment_method_nonce: params[:payment_method_nonce])
    if @result.success?
      redirect_to new_braintree_path, notice: "Congraulations! Successful transaction."
    else
      flash[:alert] = "Something went wrong while processing your transaction. Please try again!"
      gon.client_token = generate_client_token
      render :new
    end
  end

  def paypal

    ActiveMerchant::Billing::Base.mode = :test

    gateway = ActiveMerchant::Billing::PaypalGateway.new(
      :login => ENV["PAYPAL_LOGIN"],
      :password => ENV["PAYPAL_PASSWORD"],
      :signature => ENV["PAYPAL_SIGNATURE"]
    )

    credit_card = ActiveMerchant::Billing::CreditCard.new(
      :brand              => "visa",
      :number             => "4024007148673576",
      :verification_value => "123",
      :month              => 1,
      :year               => Time.now.year+1,
      :first_name         => "Ryan",
      :last_name          => "Bates"
    )

    if credit_card.valid?
      response = gateway.purchase(1000, credit_card, :ip => "127.0.0.1")
      if response.success?
        redirect_to root_path, alert: "PayPal Purchase complete!"
      else
        redirect_to root_path, alert: "Error: #{response.message}"
      end
    else
      redirect_to root_path, alert: "Error: credit card is not valid. #{credit_card.errors.full_messages.join('. ')}"
    end
  end

  private
  def generate_client_token
    Braintree::ClientToken.generate
  end
end
