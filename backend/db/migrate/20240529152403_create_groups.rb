class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :groups do |t|
      t.references :admin, null: false, foreign_key: { to_table: :users }
      t.string :name, null: false, limit: 35
      t.string :fish_species, limit: 50
      t.string :area, limit: 50

      t.timestamps
    end

    add_index :groups, :name, unique: true
  end
end
