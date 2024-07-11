class RemoveFishboardAssociations < ActiveRecord::Migration[6.0]
  def change
    remove_reference :users, :fishboard
    remove_reference :groups, :fishboard
  end
end