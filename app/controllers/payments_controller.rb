class PaymentsController < ApplicationController
  require 'activemerchant'
  before_action

  def landing
  end

  def active_merchant
    @purchase = Purchase.new
  end

  def purchase
    @purchase = Purchase.new(purchase_params)

    credit_card = ActiveMerchant::Billing::CreditCard.new(
      number: @purchase.card_number,
      verification_value: @purchase.cvc,
      month: @purchase.expiry,
      year: @purchase.expiry.split('/').last,
      name: @purchase.full_name
    )

    if credit_card.valid?
      if @purchase.active_purchase(credit_card).success?
        redirect_to activemerchant_path, alert: "ActiveMerchant Purchase complete!"
      else
        redirect_to activemerchant_path, alert: "Error: #{@purchase.active_purchase(credit_card).message}"
      end
    else
      edirect_to activemerchant_path, alert: "Error: #{credit_card.errors.join('. ')}"
    end
  end

  private
  def purchase_params
    params.require(:purchase).permit(:full_name, :card_number, :first_name, :last_name, :expiry, :cvc)
  end
end
