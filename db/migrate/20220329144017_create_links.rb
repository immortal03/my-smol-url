class CreateLinks < ActiveRecord::Migration[7.0]
  def change
    enable_extension "pgcrypto"

    create_table :links, id: :uuid do |t|
      t.string :url, null: false
      t.string :slug, null: false
      t.text :page_title
      t.integer :clicks_count, default: 0

      t.timestamps
    end

    add_index :links, :slug, unique: true
  end
end
