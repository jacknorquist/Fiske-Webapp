class AddFishboardPointsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :fishboard_points, :integer
end
