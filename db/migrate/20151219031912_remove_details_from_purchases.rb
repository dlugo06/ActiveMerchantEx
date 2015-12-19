class RemoveDetailsFromPurchases < ActiveRecord::Migration
  def change
    remove_column :purchases, :card_number
    remove_column :purchases, :full_name
    remove_column :purchases, :first_name
    remove_column :purchases, :last_name
    remove_column :purchases, :expiry
    remove_column :purchases, :cvc
  end
end
