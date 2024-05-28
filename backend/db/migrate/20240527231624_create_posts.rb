class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.references :group, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :title, limit: 100, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end