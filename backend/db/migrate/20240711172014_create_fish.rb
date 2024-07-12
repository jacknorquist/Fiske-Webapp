class CreateFish < ActiveRecord::Migration[7.1]
  def change
    drop_table :fish
    create_table :fish do |t|
      t.references :fishboard, polymorphic: true, null: false
      t.string :species
      t.float :length

      t.timestamps
    end
  end
end
