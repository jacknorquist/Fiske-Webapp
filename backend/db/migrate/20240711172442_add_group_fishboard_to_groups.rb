class AddGroupFishboardToGroups < ActiveRecord::Migration[7.1]
  def change
    add_reference :groups, :group_fishboard, foreign_key: { to_table: :group_fishboards }
  end
end
