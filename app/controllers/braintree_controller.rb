class BraintreeController < ApplicationController

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


  private
  def generate_client_token
    Braintree::ClientToken.generate
  end
end
