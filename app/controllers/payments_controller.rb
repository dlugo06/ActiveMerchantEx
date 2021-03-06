class PaymentsController < ApplicationController
  require 'activemerchant'

  def landing
  end

  def active_merchant
    @transaction = Transaction.new
  end

  def purchase
    @transaction = Transaction.new(agent_id: set_agent.id)

    credit_card = ActiveMerchant::Billing::CreditCard.new(
      number: params["number"],
      verification_value: params["cvc"],
      month: params["expiry"],
      year: year_format,
      name: params["name"]
    )

    if credit_card.valid?
      transaction = @transaction.active_purchase(credit_card)
      if transaction[:response].success?
        @transaction.update_attributes(card_id: transaction[:card_id], stripe_transaction_id: transaction[:stripe_transaction_id])
        redirect_to activemerchant_path, alert: "ActiveMerchant transaction complete!"
      else
        redirect_to activemerchant_path, alert: "Error: #{response.message}"
      end
    else
      redirect_to activemerchant_path, alert: "Error: #{credit_card.errors}"
    end
  end

  private
  def set_agent
    Agent.find(1)
  end

  def year_format
    year_input = params["expiry"].split('/').last
    if year_input.strip!.length == 2
      (year_input.to_i + 2000).to_s
    else
      year_input
    end
  end
end
