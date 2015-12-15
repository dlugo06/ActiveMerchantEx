class BraintreeController < ApplicationController

  def new
    gon.client_token = generate_client_token
    # raise
  end

  private
  def generate_client_token
    Braintree::ClientToken.generate
  end
end
