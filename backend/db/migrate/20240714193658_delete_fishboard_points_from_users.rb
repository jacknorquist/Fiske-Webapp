class DeleteFishboardPointsFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :fishboard_points;
    add_column :users, :fishboard_points, :integer, default: 0
  end
end
