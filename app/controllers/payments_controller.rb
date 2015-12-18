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
      year: year_format,
      name: @purchase.full_name
    )

    if credit_card.valid?
      if @purchase.active_purchase(credit_card).success?
        redirect_to activemerchant_path, alert: "ActiveMerchant Purchase complete!"
      else
        redirect_to activemerchant_path, alert: "Error: #{@purchase.active_purchase(credit_card).message}"
      end
    else
      redirect_to activemerchant_path, alert: "Error: #{credit_card.errors}"
    end
  end

  private
  def purchase_params
    params.require(:purchase).permit(:full_name, :card_number, :first_name, :last_name, :expiry, :cvc)
  end

  def year_format
    year_input = @purchase.expiry.split('/').last
    if year_input.strip!.length == 2
      (year_input.to_i + 2000).to_s
    else
      year_input
    end
  end
end
