class DropFishboardAndFishTables < ActiveRecord::Migration[6.0]
  def change
    drop_table :fishboard
    drop_table :fish
  end
end