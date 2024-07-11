class CreateFishboards < ActiveRecord::Migration[6.1]
  def change
    create_table :fishboards do |t|
      t.references :user, null: false, foreign_key: true
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end