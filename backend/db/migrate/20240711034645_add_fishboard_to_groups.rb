class AddFishboardToGroups < ActiveRecord::Migration[7.1]
  def change
    add_reference :groups, :fishboard, null: false, foreign_key: true
  end
end
