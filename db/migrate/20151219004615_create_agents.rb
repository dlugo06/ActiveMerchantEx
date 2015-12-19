class CreateAgents < ActiveRecord::Migration
  def change
    create_table :agents do |t|
      t.string :email
      t.string :stripe_id

      t.timestamps null: false
    end
  end
end
