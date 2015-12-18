class AddCardNumberToPurchases < ActiveRecord::Migration
  def change
    add_column :purchases, :card_number, :string
  end
end
