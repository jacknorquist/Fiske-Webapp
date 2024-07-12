class CreateGroupFishboards < ActiveRecord::Migration[7.1]
  def change
    create_table :group_fishboards do |t|
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
