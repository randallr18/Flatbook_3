class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :date, :github
  has_many :project_likes
  has_many :users, through: :user_projects
end
