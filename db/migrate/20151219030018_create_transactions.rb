class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.references :agent, index: true, foreign_key: true
      t.string :stripe_transaction_id
      t.string :card_id

      t.timestamps null: false
    end
  end
end
