class CreateFish < ActiveRecord::Migration[7.1]
  def change
    create_table :fish do |t|
      t.string :species
      t.float :length
      t.references :fishboard, null: false, foreign_key: true

      t.timestamps
    end
  end
end
