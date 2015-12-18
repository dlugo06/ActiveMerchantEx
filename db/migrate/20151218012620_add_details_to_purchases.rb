class AddDetailsToPurchases < ActiveRecord::Migration
  def change
    add_column :purchases, :full_name, :string
    add_column :purchases, :first_name, :string
    add_column :purchases, :last_name, :string
    add_column :purchases, :expiry, :string
    add_column :purchases, :cvc, :string
  end
end
