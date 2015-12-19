class RemoveStripeidFromAgents < ActiveRecord::Migration
  def change
    remove_column :agents, :stripe_id
  end
end
